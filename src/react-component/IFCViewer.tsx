import React, { Children } from 'react'
import * as OBC from "openbim-components";
import { FragmentsGroup } from 'bim-fragment';
//import { TodoCreator } from '../bim-components/TodoCreator';
import IconButton from '@mui/material/IconButton';
import AlarmIcon from '@mui/icons-material/Alarm';
import Sidebar from './Sidebar';
import { AsignTask } from '../bim-components';
interface IViewerContext{
    viewer: OBC.Components | null,
    setViewer: (viewer: OBC.Components | null)=>void,
}

export const ViewerContext = React.createContext<IViewerContext>({
    viewer: null,
    setViewer: ()=>{}
})

export function ViewerProvider(props: {children: React.ReactNode}){
    const [viewer, setViewer] = React.useState<OBC.Components | null>(null);
    return (
        <ViewerContext.Provider value={{viewer, setViewer}}>
            {props.children}
        </ViewerContext.Provider>
    )
}


export function IFCViewer(){
    const {setViewer} = React.useContext(ViewerContext);
    let viewer : OBC.Components;

    const createViewer = async ()=>{
        viewer = new OBC.Components();
        setViewer(viewer);
        const sceneComponent = new OBC.SimpleScene(viewer);
        sceneComponent.setup();
        viewer.scene = sceneComponent;
        const scene = sceneComponent.get();
        scene.background = null;

        const viewerContainer = document.getElementById("viewer-container") as HTMLDivElement;
        const rendereComponent = new OBC.PostproductionRenderer(viewer, viewerContainer);
        viewer.renderer = rendereComponent;

        const cameraComponent = new OBC.OrthoPerspectiveCamera(viewer);
        viewer.camera = cameraComponent;

        const raycasterCompoent = new OBC.SimpleRaycaster(viewer);
        viewer.raycaster = raycasterCompoent;

        viewer.init();
        cameraComponent.updateAspect();
        rendereComponent.postproduction.enabled = true;

        const fragmentManager = new OBC.FragmentManager(viewer);
        const exportFragments = (model: FragmentsGroup)=>{
            const fragmentBinary = fragmentManager.export(model);
            const blob = new Blob([fragmentBinary]);
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `${model.name.replace(".ifc","")}.frag`;
            a.click();
            URL.revokeObjectURL(url);
        }

        const highlighter = new OBC.FragmentHighlighter(viewer);
        highlighter.setup();

        const propertiesProcessor = new OBC.IfcPropertiesProcessor(viewer);

        const onModelLoaded = async (model : FragmentsGroup)=>{
            highlighter.update();
            propertiesProcessor.process(model);
            highlighter.events.select.onHighlight.add((fragmentMap)=>{
                const expressID = [...Object.values(fragmentMap)[0]][0];
                propertiesProcessor.renderProperties(model, Number(expressID));
            })
        }

        

        const ifcLoader = new OBC.FragmentIfcLoader(viewer);
        ifcLoader.settings.wasm = {
            path: "https://unpkg.com/web-ifc@0.0.43/",
            absolute: true
        }

        ifcLoader.onIfcLoaded.add(async (model)=>{
            onModelLoaded(model);
        });

        const taskItem = new AsignTask(viewer);
        taskItem.setup();

        const toolbar = new OBC.Toolbar(viewer);
        toolbar.addChild(
            ifcLoader.uiElement.get("main"),
            propertiesProcessor.uiElement.get("main"),
            taskItem.uiElement.get("activationButton"),
        )
        viewer.ui.addToolbar(toolbar);
    }

    React.useEffect(()=>{
        createViewer();
        return ()=>{
            viewer.dispose();
            setViewer(null);
        }
    },[])

    return(
    <div
      id="viewer-container"
      className="dashboard-card"
      style={{ minWidth: 0, position: "relative", width:'100%', height:'100%' }}
    >
       
    </div>
    )
}
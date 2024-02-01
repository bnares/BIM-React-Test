import { Components, SimpleUIComponent } from "openbim-components";


export class FileImageInput extends SimpleUIComponent<HTMLDivElement> {


    constructor(components: Components) {
        const template = `
        <div class="w-full">
          <label id="label" class="Image Upload"></label>
          <input id="input" type="file" accept="image/png, image/jpeg" class="block bg-transparent w-full rounded-md p-3 text-white ring-1 text-base ring-gray-500 focus:ring-ifcjs-200 focus:outline-none placeholder:text-gray-400">
        </div>
        `;
        super(components, template);
    }
}
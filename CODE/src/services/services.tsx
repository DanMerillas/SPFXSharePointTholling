/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { spfi } from "@pnp/sp";
import { IRenderListDataParameters } from "@pnp/sp/lists";
import { getSP } from "../pnpConfig/pnpConfig";

export function ReadData(listName : string){
   
    const _sp = getSP();
    const spCache = spfi(_sp).using();

    return spCache.web.lists.getByTitle(listName).items.select('Title').getAll()
}

export function ReadDataFilter(listName : string) {

    const _sp = getSP();
    const spCache = spfi(_sp).using();

    return spCache.web.lists.getByTitle(listName).items.select('Title').filter("Title eq 'Value1'").getAll()
  }

  export async function readDataRenderListDataAsStream(lista: string, listViewXml: string, folder?: string) {

    const getAllItems = async (page: string) => {
        const _sp = getSP();
        const spCache = spfi(_sp).using();
        const list = spCache.web.lists.getByTitle(lista)
        const renderListDataParams: IRenderListDataParameters = {
            ViewXml: listViewXml,
            Paging: page
        };

        if (folder)
            renderListDataParams.FolderServerRelativeUrl = folder

        // render list data as stream
        const r = await list.renderListDataAsStream(renderListDataParams);

        return r
    }

    let page: string = ""
    let r: any = []
    let resultsItems: any = undefined

    do {

        r = await getAllItems(page)

        if (resultsItems)
            resultsItems.Row = resultsItems.Row.concat(r.Row)
        else {
            resultsItems = r
        }

        if (r.NextHref)
            page = r.NextHref.split('?')[1]
    }
    // eslint-disable-next-line no-unmodified-loop-condition
    while (r.NextHref)


    
    return resultsItems
}
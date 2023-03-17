import { WebPartContext } from "@microsoft/sp-webpart-base";

// import pnp and pnp logging system
import { spfi, SPFI, SPFx } from "@pnp/sp";
import { LogLevel, PnPLogging } from "@pnp/logging";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/batching";
//import { useState } from "react";

// eslint-disable-next-line no-var
var _sp: SPFI = null;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
//const [contextCache, setcontextCache] = useState<any>({});

export const getSP = (context?: WebPartContext): SPFI => {
  if (context != null) { // eslint-disable-line eqeqeq
    //You must add the @pnp/logging package to include the PnPLogging behavior it is no longer a peer dependency
    // The LogLevel set's at what level a message will be written to the console
    _sp = spfi().using(SPFx(context)).using(PnPLogging(LogLevel.Warning));
    //setcontextCache(context)
  }
  return _sp;
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
// export function getCacheContext(){
//   return contextCache
// }
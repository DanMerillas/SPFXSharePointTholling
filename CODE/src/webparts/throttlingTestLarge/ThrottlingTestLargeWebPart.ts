import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import ThrottlingTestLarge from './components/ThrottlingTestLarge';
import { IThrottlingTestLargeProps } from './components/IThrottlingTestLargeProps';

import { getSP } from '../../pnpConfig/pnpConfig';

export interface IThrottlingTestLargeWebPartProps {
  description: string;
}

export default class ThrottlingTestLargeWebPart extends BaseClientSideWebPart<IThrottlingTestLargeWebPartProps> {



  public render(): void {
    const element: React.ReactElement<IThrottlingTestLargeProps> = React.createElement(
      ThrottlingTestLarge,
      {
      
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected async onInit(): Promise<void> {
    await super.onInit();
    
    getSP(this.context);
  }
 
  
  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

}

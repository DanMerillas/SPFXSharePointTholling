import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'ThrottlingTestWebPartStrings';
import ThrottlingTest from './components/ThrottlingTest';
import { IThrottlingTestProps } from './components/IThrottlingTestProps';

import { getSP } from '../../pnpConfig/pnpConfig';

export interface IThrottlingTestWebPartProps {
  description: string;
}

export default class ThrottlingTestWebPart extends BaseClientSideWebPart<IThrottlingTestWebPartProps> {



  public render(): void {
    const element: React.ReactElement<IThrottlingTestProps> = React.createElement(
      ThrottlingTest,
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

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}

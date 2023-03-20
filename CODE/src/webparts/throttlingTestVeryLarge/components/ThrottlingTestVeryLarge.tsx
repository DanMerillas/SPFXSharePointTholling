/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-floating-promises */
import * as React from 'react';
import styles from '../../throttlingTest/components/ThrottlingTest.module.scss';
import { IThrottlingTestVeryLargeProps } from './IThrottlingTestVeryLargeProps';
import "@pnp/sp/lists";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items/get-all";
import { ReadData, ReadDataFilter, readDataRenderListDataAsStream } from '../../../services/services';


export interface ICustomListViewState {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  listItems: any;
  filterListItems: any;
  filterListItemsRenderListDataAsStream: any;
}

export default class ThrottlingTestVeryLarge extends React.Component<{}, ICustomListViewState> {

  constructor(props: any) {
    super(props);

    this.state = {
      listItems: [],
      filterListItems: [],
      filterListItemsRenderListDataAsStream: []
    };
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  public readDataVeryLarge() {

    ReadData('VeryLargeList').then((result: any) => {
      this.setState({
        listItems: result
      });
    }).catch((reason) => {
      alert(reason.message)
    })
  }

  public readDataFilterVeryLarge() {

    ReadDataFilter('VeryLargeList')
      .then((result: any) => {
        this.setState({
          filterListItems: result
        });
      }).catch((reason) => {
        alert(reason.message)
      })
  }

  public readDataFilterRenderListDataAsStream() {

    const ViewXml = `<View>
                    <ViewFields>
                      <FieldRef Name="Title"/>
                    </ViewFields>
                    <Query>
                      <Where>
                        <Eq>
                          <FieldRef Name="Title"/><Value Type="Text">Value1</Value>
                        </Eq>
                      </Where>
                      <OrderBy>
                        <FieldRef Name="Title" Ascending="False" />
                      </OrderBy>
                    </Query>
                    <RowLimit Paged="TRUE">4999</RowLimit> 
                  </View>`

    readDataRenderListDataAsStream('VeryLargeList', ViewXml).then((result: any) => {
      this.setState({
        filterListItemsRenderListDataAsStream: result
      });
    }).catch((reason) => {
      alert(reason.message)
    })

  }

  public render(): React.ReactElement<IThrottlingTestVeryLargeProps> {


    return (
      <section className={`${styles.throttlingTest}`}>

        <div>
          <h4>Leyendo de un lista con 10000 elementos</h4>
          <p>
            Leemos de la lista "VeryLargeList" que tiene 5001 elementos
          </p>
          <p>
            <button className={`${styles.buttonWP}`} onClick={this.readDataVeryLarge.bind(this)}>Leer de la lista</button>
          </p>
          <h5>Total elementos leidos: {this.state.listItems.length}</h5>

          <h4>Filtrando una lista muy grande</h4>
          <p>
            Leemos de la lista "VeryLargeList" que tiene 10000 elementos pero recuperamos los que tiene el campo Title = Value1 (6000 elementos). La columna Title esta indizada pero <strong>el filtro traer mas de 5000 elementos</strong>
          </p>
          <p>
            <button className={`${styles.buttonWP}`} onClick={this.readDataFilterVeryLarge.bind(this)}>Leer de la lista</button>
          </p>
          <h5>Total elementos leidos: {this.state.filterListItems.length}</h5>

          <h4>Filtrando una lista muy grande con RenderListDataAsStream</h4>
          <p>
            Leemos de la lista "VeryLargeList" que tiene 10000 elementos pero recuperamos los que tiene el campo Title = Value1 (6000 elementos). La columna Title esta indizada pero <strong>el filtro traer mas de 5000 elementos</strong>
          </p>
          <p>
            <button className={`${styles.buttonWP}`} onClick={this.readDataFilterRenderListDataAsStream.bind(this)}>Leer de la lista</button>
          </p>
          <h5>Total elementos leidos: {this.state.filterListItemsRenderListDataAsStream.Row ? this.state.filterListItemsRenderListDataAsStream.Row.length : this.state.filterListItemsRenderListDataAsStream.length}</h5>

        </div>
      </section>
    );
  }


}

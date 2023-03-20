/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-floating-promises */
import * as React from 'react';
import styles from '../../throttlingTest/components/ThrottlingTest.module.scss';
import { IThrottlingTestLargeProps } from './IThrottlingTestLargeProps';

import "@pnp/sp/lists";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items/get-all";
import { ReadData, ReadDataFilter } from '../../../services/services';

export interface ICustomListViewState {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  listItems: any;
  listItemsIndex: any;
  filterListItems:any
  filterListItemsindex:any
}

export default class ThrottlingTestLarge extends React.Component<{}, ICustomListViewState> {

  constructor(props: any) {
    super(props);

    this.state = {
      listItems: [],
      listItemsIndex: [],
      filterListItems: [],
      filterListItemsindex:[]
    };
  }

  public readDataLarge() {

    
    ReadData('LargeList').then((result: any) => {
        this.setState({
          listItems: result
        });
      }).catch((reason)=>{
        alert(reason.message)
      })
  }

  public readDataLargeWithColumnIndex() {

    
    ReadData('LargeListWithColumnIndex').then((result: any) => {
        this.setState({
          listItemsIndex: result
        });
      }).catch((reason)=>{
        alert(reason.message)
      })
  }

  public readDataFilterLarge() {

   ReadDataFilter('LargeList')
      .then((result: any) => {
        this.setState({
          filterListItems: result
        });
      }).catch((reason)=>{
        alert(reason.message)
      })
  }

  public readDataFilterLargeWithColumnIndex() {

    ReadDataFilter('LargeListWithColumnIndex')
       .then((result: any) => {
         this.setState({
           filterListItemsindex: result
         });
       }).catch((reason)=>{
         alert(reason.message)
       })
   }

  public render(): React.ReactElement<IThrottlingTestLargeProps> {


    return (
      <section className={`${styles.throttlingTest}`}>

        <div>
          <h4>Leyendo de un lista con 5001 elementos SIN indices</h4>
          <p>
            Leemos de la lista "LargeList" que tiene 5001 elementos <strong>sin</strong> columnas indizadas
          </p>
          <p>
            <button className={`${styles.buttonWP}`} onClick={this.readDataLarge.bind(this)}>Leer de la lista</button>
          </p>
          <h5>Total elementos leidos: {this.state.listItems.length}</h5>

          <h4>Filtrando una lista grande</h4>
          <p>
            Leemos de la lista "LargeList" que tiene 5001 elementos pero recuperamos los que tiene el campo Title = Value1 (2501 elementos)
          </p>
          <p>
            <button className={`${styles.buttonWP}`} onClick={this.readDataFilterLarge.bind(this)}>Leer de la lista</button>
          </p>
          <h5>Total elementos leidos: {this.state.filterListItems.length}</h5>


          <h4>Leyendo de un lista con 5001 elementos CON indices</h4>
          <p>
            Leemos de la lista "LargeListWithColumnIndex" que tiene 5001 elementos <strong>con</strong> columnas indizadas
          </p>
          <p>
            <button className={`${styles.buttonWP}`} onClick={this.readDataLargeWithColumnIndex.bind(this)}>Leer de la lista</button>
          </p>
          <h5>Total elementos leidos: {this.state.listItemsIndex.length}</h5>

          <h4>Filtrando una lista grande</h4>
          <p>
            Leemos de la lista "LargeListWithColumnIndex" que tiene 5001 elementos pero recuperamos los que tiene el campo Title = Value1 (2501 elementos). La columna Title esta indizada y permite filtrar
          </p>
          <p>
            <button className={`${styles.buttonWP}`} onClick={this.readDataFilterLargeWithColumnIndex.bind(this)}>Leer de la lista</button>
          </p>
          <h5>Total elementos leidos: {this.state.filterListItemsindex.length}</h5>

        </div>
      </section>
    );
  }


}

/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-floating-promises */
import * as React from 'react';
import styles from './ThrottlingTest.module.scss';
import { IThrottlingTestProps } from './IThrottlingTestProps';
import { getSP } from '../../../pnpConfig/pnpConfig';
import { spfi } from '@pnp/sp';
import "@pnp/sp/lists";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items/get-all";

export interface ICustomListViewState {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  listItems: any;
  filterListItems:any
}

export default class ThrottlingTest extends React.Component<{}, ICustomListViewState> {

  constructor(props: any) {
    super(props);

    this.state = {
      listItems: [],
      filterListItems: [],
    };
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  public readData() {

    const that = this
    const _sp = getSP();
    const spCache = spfi(_sp).using();

    spCache.web.lists.getByTitle('NormalList').items.select('Title').getAll()
      .then((result: any) => {
        that.setState({
          listItems: result
        });
      }).catch((reason)=>{
        alert(reason.message)
      })
  }

  public readDataFilter() {

    const that = this
    const _sp = getSP();
    const spCache = spfi(_sp).using();

    spCache.web.lists.getByTitle('NormalList').items.select('Title').filter("Title eq 'Value1'").getAll()
      .then((result: any) => {
        that.setState({
          filterListItems: result
        });
      }).catch((reason)=>{
        alert(reason.message)
      })
  }

  public render(): React.ReactElement<IThrottlingTestProps> {


    return (
      <section className={`${styles.throttlingTest}`}>

        <div>
          <h4>Leyendo de un lista normal</h4>
          <p>
            Leemos de la lista "NormalList" que tiene 70 elementos
          </p>
          <p>
            <button className={`${styles.buttonWP}`} onClick={this.readData.bind(this)}>Leer de la lista</button>
          </p>
          <h5>Total elementos leidos: {this.state.listItems.length}</h5>

          <h4>Filtrando una lista normal</h4>
          <p>
            Leemos de la lista "NormalList" que tiene 70 elementos pero recuperamos los que tiene el campo Title = Value1 (50 elementos)
          </p>
          <p>
            <button className={`${styles.buttonWP}`} onClick={this.readDataFilter.bind(this)}>Leer de la lista</button>
          </p>
          <h5>Total elementos leidos: {this.state.filterListItems.length}</h5>

        </div>
      </section>
    );
  }


}

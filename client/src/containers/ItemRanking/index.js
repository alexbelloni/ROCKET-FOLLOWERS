import React, { Component } from 'react'
import Country from '../../components/Country';

class ItemRanking extends Component {
    getRanking() {
        const arr = this.props.arr;
        const quantity = this.props.quantity || 1000;

        const ranking = [];
        let q = 0, i = 0;
        while (q < quantity && i < arr.length) {
          const c = arr[i];
          if (c.COUNTRY !== 'ALL' && c.COUNTRY !== 'TBD') {
            let threeLetterCode = c.SPADOC_CD || c.COUNTRY;
            if (threeLetterCode === 'PRC') { threeLetterCode = 'CHN' }

            ranking.push(
              <div key={threeLetterCode}>
                <Country threeLetterCode={threeLetterCode} text={this.props.getText(c)} />
              </div>
            );
          }
          q = ranking.length;
          i++;
        }
        return ranking;
      }

  render() {
    return (
      <div>
        {this.getRanking()}
      </div>
    )
  }
}

export default ItemRanking

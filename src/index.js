import _ from 'lodash';

const propertyData = {
  id: 1,
  propertyName: '1BR Japanese-style Private Room near Kyoto Station',
  propertyType: 'private',
  cancelPolicy: 'strict',
  roomNum: 1,
  bathroomNum: 1,
  priceInDollars: 50,
  host: {
    id: 1,
    firstName: 'Tom'
  }
}

function handleClick(e) {
  e.preventDefault();
  const mainEl = document.getElementById('main');
  /*
    getDataを呼び出して、mainEl.innerHTMLを利用して、結果を出力します。
  */
  return getData().then((outputData) => {
      mainEl.innerHTML = `
      <p>名前:${outputData.propertyName}</p>
      <p>タイプ:${outputData.propertyType}</p>
      <p>キャンセルポリシー:${outputData.cancelPolicy}</p>
      <p>部屋の数:${outputData.roomNum}</p>
      <p>バスルームの数:${outputData.bathroomNum}</p>
      <p>料金:${outputData.priceInDollars}</p>
      <p>ホスト:${outputData.host.firstName}</p>
    `;
    })
    .catch((error) => {
      mainEl.innerHTML = `<p>${error.message}</p>`;
    });
}

function getData() {
  /*
    fetchDataを呼び出して、戻ってきたデータのsuccessの値を元にresolveで物件データまたは、rejectでエラーメッセージを返す。
  */
  return fetchData().then((res) => {
    if (res.success) {
      return Promise.resolve(res.propertyData);
    } else {
      return Promise.reject(res.message);
    }
  })
}

function fetchData() {
  /*
    lodashのrandom()を使って、80%の確率で正しいデータを返し、20%の確率でエラーを返すようにしましょう。
    またsetTimeoutを利用して、1秒待ってから結果を得るようにします。
  */
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const percentage = _.random(1, 5);
      if (percentage <= 4) {
        resolve({
          success: true,
          propertyData: propertyData
        });
      } else {
        reject({
          success: false,
          message: 'データの取得に失敗しました。'
        });
      }
    }, 1000);
  });
}

{
  const button1 = document.getElementById('button1');
  button1.addEventListener("click", handleClick);
}

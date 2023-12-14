type Servic = {
    index: number;
    id: number;
    name: string;
    time: string | number;
    price: string | number;
  };

  export const funkcija = () =>{
      let brijanje: Servic = {
        index: 2,
        id: 3,
        name: "brijanje",
        time: "10",
        price: "250",
      }

      console.log(brijanje.time)

      brijanje = {...brijanje,price:250}

  }
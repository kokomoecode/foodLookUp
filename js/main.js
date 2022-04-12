
function getFetch(){
  let inputVal = document.getElementById('barcode').value

  if(inputVal.length !== 12){
    alert('Please ensure that barcode is 12 characters')
    return;
  }

  const url = `https://world.openfoodfacts.org/api/v0/product/${inputVal}.json`


  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
        if(data.status === 1){
        const item = new ProductInfo(data.product)
        console.log(item.ingredients)
        item.testCall()
        item.showInfo()
        item.listCal()
        item.listIngredients()
        } else if (data.status === 0){
            alert(`Product ${inputVal} not found. Please try another.`)
        }
      })
      .catch(err => {
          console.log(`error ${err}`)
      });


  class ProductInfo{
        constructor(productData){ // I'm passing in data.product
          this.name = productData.product_name
          this.ingredients = productData.ingredients
          this.image = productData.image_url
          this.nutriments = productData.nutriments
        }

        testCall(){
          console.log(this.nutriments.energy)
        }

        // listCal(){
        //     for (const entry of Object.entries(this.nutriments)){
        //         console.log(`${entry[0]} => ${entries[1]}`)
        //     }
        // }


        showInfo(){
          document.getElementById('product-image').src = this.image;
          document.getElementById('product-name').innerText = this.name;
        }

        listIngredients(){
          let tableRef = document.getElementById('ingredient-table')

          for (let i = 1; i <tableRef.rows.length;)
          {
              tableRef.deleteRow(i);
          }

          if(!(this.ingredients == null)){
            for (let key in this.ingredients){
                let newRow = tableRef.insertRow(-1) //end of the array/row
                let newICell = newRow.insertCell(0)
                let newVCell = newRow.insertCell(1)
                let newIText = document.createTextNode(this.ingredients[key].text)
                let vegStatus = !(this.ingredients[key].vegetarian) ? 
                'unknown' : this.ingredients[key].vegetarian 
                let newVText = document.createTextNode(vegStatus)
                newICell.appendChild(newIText)
                newVCell.appendChild(newVText)
                if (vegStatus === 'no'){
                    newVCell.classList.add('non-veg-item')
                }  else if (vegStatus === 'unknown' || vegStatus === 'maybe'){
                    newVCell.classList.add('unknown-maybe-item')
                } 
          }
        }



        
        
    }
  }

}


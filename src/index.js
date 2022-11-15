import './style.css';

async function update() {
  let res = await fetch("../quotes.json");
  return await res.json();
}

function printData(data, htmlID) {
  let list = document.getElementById(htmlID);
  list.textContent = "";

    if(htmlID='theList'){
        for (let d of data) {
            let li = document.createElement("li");
            for(let a of d.quote){
                if(a==='the' || a === 'The'){
                    let b = document.createElement("b")
                    b.innerHTML=a
                    li.appendChild(b)
                }else{
                    li.textContent+=a
                }
            }
            list.appendChild(li);
          }
    }else{
        for (let d of data) {
          let li = document.createElement("li");
          li.innerHTML = d.quote + "\n\t-" + d.author;
          list.appendChild(li);
        }
    }

}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("all").addEventListener("click", async () => {
    let data = await update();
    let abc = data.quotes.sort(function (a, b) {
      let first = a.author.toUpperCase();
      let second = b.author.toUpperCase();

      if (first < second) {
        return -1;
      } else if (first > second) {
        return 1;
      } else {
        return 0;
      }
    });
    printData(abc, "allList");
  });

  document.getElementById("the").addEventListener("click", async () => {
    let theArr = [];
    let data = await update();
    let filter = data.quotes.filter(
      (q) => q.quote.includes("the") || q.quote.includes("The")
    );
    printData(filter, "theList");
  });
});

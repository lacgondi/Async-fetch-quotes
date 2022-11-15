import "./style.css";

async function update() {
  let res = await fetch("../quotes.json");
  return await res.json();
}

function printData(data, htmlID) {
  let list = document.getElementById(htmlID);
  list.textContent = "";
    for (let d of data) {
      let li = document.createElement("li");
      li.innerHTML = d.quote + "\n\t-" + d.author;
      list.appendChild(li);
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
    for(let f of filter){ 
        let line = f.quote+"\n\t-"+f.author;
        line.replaceAll(' The ', '<b> The </b>')
        line.replaceAll(' the ', '<b> the </b>')
        theArr.push(line);
    }
    let list = document.getElementById('theList')
    for (let d of theArr) {
        let li = document.createElement("li");
        li.innerHTML = d;
        list.appendChild(li);
      }
  });

  document.getElementById("length").addEventListener("click", async () => {
    let data = await update();
    let lengthArr = [];
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
    let list = document.getElementById("lengthList");
    list.textContent = "";
    for (let d of abc) {
      let li = document.createElement("li");
      lengthArr.push(d.quote.length);
      li.innerHTML = d.quote.length + " " + d.quote + "\n\t-" + d.author;
      list.appendChild(li);
    }
  });

  document.getElementById('search').addEventListener('change', async()=>{
    let searchString = document.getElementById('search').value;
    let data =await update();
    let filter = data.quotes.filter(q =>q.author.toLowerCase()===searchString.toLowerCase());
    document.getElementById('countOut').value=filter.length;
  })
});

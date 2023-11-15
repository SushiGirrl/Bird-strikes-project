console.log(data)

const ctx = document.querySelector("#bar-test")

const myChart = new Chart(ctx,
    {
        type:'bar',
        data:{
            labels:data.map((row)=>row.Airport),
            datasets:[
                {
                    label:'stuff',
                    data: data.map(row=>row.total),
                }
            ]
        }
});
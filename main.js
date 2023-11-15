console.log(data[1].Airport)

const ctx = document.querySelector("#bar-test")
const yLabels = data.map((row)=>row.Airport)
const myChart = new Chart(ctx,
    {
        type:'bar',
        data:{
            labels:yLabels,
            datasets:[
                {
                    label:'Total cost per Airport',
                    data: data.map(row=>row.total),
                    backgroundColor: ["red","blue"],
                }
            ]
        },
        options:{
            maintainAspectRatio: false,
            indexAxis:"y",
            plugins:{
                title:{
                    display:true,
                    text:"The Cost",
                    font:{
                        size:22,
                        weight: "bold",
                    }
                }
            },
            scales:{
                y:{

                },
                x:{

                },
            },
        }
});
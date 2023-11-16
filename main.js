console.log(data)

const ctx = document.querySelector("#bar-test")
const yLabels = data.map((row)=>row.Airport)
const bgColorArray = []

data.forEach((obj,index)=> {
    obj.Airport == "UNKNOWN" ? bgColorArray[index]="grey" : bgColorArray[index]="#8C0383"
})



const myChart = new Chart(ctx,
    {
        type:'bar',
        data:{
            labels:yLabels,
            datasets:[
                {
                    label:'Total cost per Airport per year',
                    data: data.map(row=>row.totalPerYear),
                    backgroundColor: bgColorArray,
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

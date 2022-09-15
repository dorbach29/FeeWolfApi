const {Heap} = require("../Heapsort");

function isHeap(arr){
    for(let i = 0 ; i <= arr.length / 2 ; i ++){
        let currVal = arr[i];
        let leftI = (i * 2) + 1;
        let rightI = (i * 2) + 1;
        let rightOK = (rightI >= arr.length || currVal >= arr[rightI]);
        let leftOK = (leftI >= arr.length || currVal >= arr[leftI]);
        if(!rightOK || !leftOK) return false;
    }
    return true;
}


test("isHeap()" , ()=>{
    let notHeap1 = [   
         74, 
      60,   46, 
    54,5,  59 
    ];

    let notHeap2 = [
        95, 
     81,   53,
   33,61, 10, 7, 
  49
  ];

  let heap1 = [ 
      97, 
   40,   86, 
  32,39 
  ];

  let heap2 = [ 
     97, 
   40, 86, 
  32,
  ];

    
    expect(isHeap(notHeap1)).toBe(false);
    expect(isHeap(notHeap2)).toBe(false);
    expect(isHeap(heap1)).toBe(true);
    expect(isHeap(heap2)).toBe(true);

})

//TODO Test Heapify

test("percolateDown()" , ()=>{
    let tree1 = [   
        74, 
     60,   46, 
    54,5,  59 
    ];
    


    Heap.percolateDown(tree1 , 2);
    expect(tree1[5]).toBe(46);
    expect(tree1[2]).toBe(59);

    let tree2 = [0, 2, 1]
    Heap.percolateDown(tree2, 0)
    Heap.percolateDown(tree2, 1)
    expect(tree2[0]).toBe(2)
}) 

test("extractMax()" , ()=>{
    let set1 = [19, 4, 25, 6, 1, 103, 5, 18]
    let heap1 = Heap.heapify(set1);
    let heap2 = [1]

    expect(Heap.extractMax(heap1)).toBe(103);
    expect(Heap.extractMax(heap1)).toBe(25);
    expect(heap1.length).toBe(6)
    expect(Heap.extractMax(heap2)).toBe(1)    
    expect(Heap.extractMax(heap2)).toBe(null)

})
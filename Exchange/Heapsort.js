
class Heap {

    heap = [] //Array of objects
    key = null //Key which to compare (Incase of future use)

    constructor(heap){
    
    }

    //TODO: Implement this for keys
    /**
     * PRIVATE
     * Alters given maxHeap by percolating down the node at given index
     * @param {int[]} maxHeap (get's treated as an array)
     * @param {*} currIndex   (index of the node which to percolat edown)
     */
    static percolateDown(maxHeap, currIndex, key){
        if(currIndex < 0 || currIndex > maxHeap.length) return;
        let leftChildIndex = 2 * currIndex + 1;
        let rightChildIndex=  2 * currIndex + 2;
    
        //Reached leaf node, no more percolations nessecary 
        if(leftChildIndex >= maxHeap.length && rightChildIndex >= maxHeap.length) return;

        //Min_Value so that currNode must be greater
        let leftChildVal = Number.NEGATIVE_INFINITY;
        let rightChildVal = Number.NEGATIVE_INFINITY;
        let leftChildNode;
        let rightChildNode;
        let currNode = maxHeap[currIndex]
        let currVal = maxHeap[currIndex][key];
        if(leftChildIndex < maxHeap.length){
            leftChildVal = maxHeap[leftChildIndex][key];
            leftChildNode = maxHeap[leftChildIndex]
        } 
        if(rightChildIndex < maxHeap.length){ 
            rightChildVal = maxHeap[rightChildIndex][key];
            rightChildNode = maxHeap[rightChildIndex];
        }
        //Swap with leftChild is nessecary, continue percolating down
        if(leftChildVal > rightChildVal && leftChildVal > currVal){
            maxHeap[leftChildIndex] = currNode;
            maxHeap[currIndex] = leftChildNode;
            Heap.percolateDown(maxHeap, leftChildIndex, key);
        }
    
        //Swap with rightChild is nessecary, continue percolating down
        else if(rightChildVal > currVal){
            maxHeap[rightChildIndex] = currNode;
            maxHeap[currIndex] = rightChildNode;
            Heap.percolateDown(maxHeap, rightChildIndex, key);
        }

        else {
            return;
        }

  
        //No more percolations nessecary
    }


    /**
     * PRIVATE
     * Heapifies a given array of integers (hopefully to be used by a constructr)
     * @param {int[]} array 
     * @returns {int[]}  heapified array of integers
     */
    static heapify(array, key){
        for(let i = Math.floor(array.length / 2); i >= 0; i --){
            Heap.percolateDown(array, i, key);
        }
        return array;
    }

    /**
     * PRIVATE
     * Removes the max from a given array of heaps
     * @param {int[]} heap 
     */
    static extractMax(heap, key){
        if(heap.length <= 0) return null;
        if(heap.length == 1) return heap.pop();
        //console.log(heap);

        let max = heap[0];
        let newMax = heap.pop();
        heap[0] = newMax;
        Heap.percolateDown(heap, 0, key);
        return max;
    }

    /**
     * Public
     * Sorts the given array in descending order
     * @param {int[]} array 
     */
    static heapSort(array, key){
        let sortedArray = []; 
        Heap.heapify(array, key);
        while(array.length > 0 ){
            let elem = Heap.extractMax(array, key);
            sortedArray.push(elem);
        }
        return sortedArray;
    }
}

//Percolate down every element
function testHeapify(){
    for(let i = 5 ;  i < 15; i ++){
        let arr = [];
        //Make Random Array
        for(let j = 0; j < i; j ++){
            let nextInt = Math.floor(Math.random() * 100);
            arr.push(nextInt);
        }

        console.log("Heapifying:")
        console.log(arr);
        let heap = heapify(arr);
        console.log(heap);
        console.log("");
    }
}

function testSwap(key){
    let arr =  [{
        name : "Daniel",
        number  : 3

    },
    {
        name : "Tom",
        number : 2
    },
    {
        name : "Jill",
        number : 1
    },
    {
        name: "Mike",
        number: 25,

    },
    {
        names: "DJ",
        number: 14,
    }


]
    
    let heap = Heap.heapSort(arr, "number");
    console.log(heap);
    console.log(arr);

}

function testHeapSort(){
    
    let arrs =[ 
    [0],
    [0, 1],
    [0, 2, 1],
    [1, 2, 3, 4 ],
    [-135, -122, -204, -208, -103, -87, -99],
    [0, 0, 0, 0, 1],
    [-100, 1],
    [-135, -122, -204, 56, -208, 203, -103, 485, 22, 35, 67, 43 , -87, -99, 0],
    [-135, -122, -204, 56, -208, 203, -103, 485, 22, 35, 67, 43 , -87, -99, 0 , -1350, 1242, -2604, 856, -2208, 3203, 14103, 8485, 022,235, 657, 453 , -287, -991, 10 
    , -135, -122, -204, 56, -208, 203, -103, 485, 22, 35, 67, 43 , -87, -99, 0 , -1350, 1242, -2604, 856, -2208, 3203, 14103, 8485, 022,235, 657, 453 , -287, -991, 10 
    , -135, -122, -204, 56, -208, 203, -103, 485, 22, 35, 67, 43 , -87, -99, 0 , -1350, 1242, -2604, 856, -2208, 3203, 14103, 8485, 022,235, 657, 453 , -287, -991, 10
    , -135, -122, -204, 56, -208, 203, -103, 485, 22, 35, 67, 43 , -87, -99, 0 , -1350, 1242, -2604, 856, -2208, 3203, 14103, 8485, 022,235, 657, 453 , -287, -991, 10
    , -135, -122, -204, 56, -208, 203, -103, 485, 22, 35, 67, 43 , -87, -99, 0 , -1350, 1242, -2604, 856, -2208, 3203, 14103, 8485, 022,235, 657, 453 , -287, -991, 10
    , -135, -122, -204, 56, -208, 203, -103, 485, 22, 35, 67, 43 , -87, -99, 0 , -1350, 1242, -2604, 856, -2208, 3203, 14103, 8485, 022,235, 657, 453 , -287, -991, 10
    , -135, -122, -204, 56, -208, 203, -103, 485, 22, 35, 67, 43 , -87, -99, 0 , -1350, 1242, -2604, 856, -2208, 3203, 14103, 8485, 022,235, 657, 453 , -287, -991, 10] 




    ]   
    for(let i = 0; i < arrs.length; i++){
        let sortedArray = Heap.heapSort(arrs[i]);
        console.log(sortedArray);
        console.log(arraySorted(sortedArray));
    }

    // let array = [5, 1, 6, 8, 10, 13, 9, 0, 47, 1003,  567, 221, -8];
    // let sorted = Heap.heapSort(array);
    // console.log(sorted);


    // let array = [5, 1, 6, 8, 10, 13, 9, 0, 47, 1003,  567, 221, 7];
    // let sorted = Heap.heapSort(array);
    // console.log(sorted);


    // let array1 = [13, 10, 9,  8, 5,6,  1, 0, -8];
    // let sorted1 = Heap.heapSort(array1);
    // console.log(sorted1);

    // let array = [0, -8];
    // let sorted = Heap.heapSort(array);
    // console.log(sorted);
    

}

function arraySorted(array){
    let curr;
    let prev = Number.MAX_VALUE;
    for(let i = 0 ; i < array.length; i++){
        curr = array[i]; 
        if(prev < curr) return false;
        prev = curr;
    }
    return true
}



//testHeapSort();
testSwap("number");

module.exports = {
    Heap : Heap,
}

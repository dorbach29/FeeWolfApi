/**
 * Utility function for sorting,
 * as I need a heap
 */

class Heap {

    heap = []

    static percolateDown(maxHeap, currIndex){
        if(currIndex < 0 || currIndex > maxHeap.length) return;
        let leftChildIndex = 2 * currIndex + 1;
        let rightChildIndex=  2 * currIndex + 2;
    
        //Reached leaf node, no more percolations nessecary 
        if(leftChildIndex >= maxHeap.length && rightChildIndex >= maxHeap.length) return;
        
        //Min_Value so that currNode must be greater
        let leftChildVal = Number.MIN_VALUE;
        let rightChildVal = Number.MIN_VALUE;
        let currVal = maxHeap[currIndex];
        if(leftChildIndex < maxHeap.length) leftChildVal = maxHeap[leftChildIndex];
        if(rightChildIndex < maxHeap.length) rightChildVal = maxHeap[rightChildIndex];
    
        //Swap with leftChild is nessecary, continue percolating down
        if(leftChildVal > rightChildVal && leftChildVal > currVal){
            maxHeap[leftChildIndex] = currVal;
            maxHeap[currIndex] = leftChildVal;
            Heap.percolateDown(maxHeap, leftChildIndex);
        }
    
        //Swap with rightChild is nessecary, continue percolating down
        else if(rightChildVal > currVal){
            maxHeap[rightChildIndex] = currVal;
            maxHeap[currIndex] = rightChildVal;
            Heap.percolateDown(maxHeap, rightChildIndex);
        }
        //No more percolations nessecary
    }

    static heapify(array){
        for(let i = array.length - 1; i >= 0; i --){
            percolateDown(array, i);
        }
        return array;
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



module.exports = {
    Heap : Heap,
}

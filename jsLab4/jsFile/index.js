class SortingLibrary {

    static countUndefined(value) {
        return value === undefined;
    }


    static #logResults(method, comparisons, swaps, undefinedCount, arrayLength) {
        console.log(`\nНазва метода сортування ${method}:`);
        console.log(`Кількість обмінів в процесі сортування: ${swaps}`);
        console.log(`Кількість порівнянь: ${comparisons}`);
        if (undefinedCount > 0) {
            console.log(`Знайшов ${undefinedCount} undefined випадків в массиві з ${arrayLength} елементів і закинув у кінець масиву`);
        }
    }

    
    static bubbleSort(arr, ascending = true) {
        let comparisons = 0;
        let swaps = 0;
        let undefinedCount = 0;
        const n = arr.length;
        const result = [...arr];
    
        
        for (let i = 0; i < n; i++) {
            if (this.countUndefined(result[i])) undefinedCount++;
        }
    
        
        for (let i = n - 1; i >= 0; i--) {
            if (this.countUndefined(result[i])) {
                result.splice(i, 1);           
                result.push(undefined);        
            }
        }
    
        
        for (let i = 0; i < n - 1 - undefinedCount; i++) {
            for (let j = 0; j < n - 1 - i - undefinedCount; j++) {
                comparisons++;
                if (this.countUndefined(result[j]) || this.countUndefined(result[j + 1])) continue;
    
                const shouldSwap = ascending 
                    ? result[j] > result[j + 1]
                    : result[j] < result[j + 1];
    
                if (shouldSwap) {
                    [result[j], result[j + 1]] = [result[j + 1], result[j]];
                    swaps++;
                }
            }
        }
    
        this.#logResults("Bubble Sort", comparisons, swaps, undefinedCount, n);
        return result;
    }

  
    static selectionSort(arr, ascending = true) {
        let comparisons = 0;
        let swaps = 0;
        let undefinedCount = 0;
        const n = arr.length;
        const result = [...arr];

        for (let i = 0; i < n; i++) {
            if (this.countUndefined(result[i])) undefinedCount++;
        }

        for (let i = 0; i < n - 1; i++) {
            let minIdx = i;
            for (let j = i + 1; j < n; j++) {
                comparisons++;
                if (this.countUndefined(result[j])) continue;
                if (this.countUndefined(result[minIdx])) {
                    minIdx = j;
                    continue;
                }

                const shouldChange = ascending
                    ? result[j] < result[minIdx]
                    : result[j] > result[minIdx];

                if (shouldChange) minIdx = j;
            }
            if (minIdx !== i) {
                [result[i], result[minIdx]] = [result[minIdx], result[i]];
                swaps++;
            }
        }

        this.#logResults("Selection Sort", comparisons, swaps, undefinedCount, n);
        return result;
    }

  
    static insertionSort(arr, ascending = true) {
        let comparisons = 0;
        let swaps = 0;
        let undefinedCount = 0;
        const n = arr.length;
        const result = [...arr];

        for (let i = 0; i < n; i++) {
            if (this.countUndefined(result[i])) undefinedCount++;
        }

        for (let i = 1; i < n; i++) {
            let key = result[i];
            let j = i - 1;

            while (j >= 0 && !this.countUndefined(key)) {
                comparisons++;
                if (this.countUndefined(result[j])) {
                    result[j + 1] = result[j];
                    j--;
                    swaps++;
                    continue;
                }

                const shouldMove = ascending
                    ? result[j] > key
                    : result[j] < key;

                if (!shouldMove) break;

                result[j + 1] = result[j];
                j--;
                swaps++;
            }
            result[j + 1] = key;
        }

        this.#logResults("Insertion Sort", comparisons, swaps, undefinedCount, n);
        return result;
    }

    
    static shellSort(arr, ascending = true) {
        let comparisons = 0;
        let swaps = 0;
        let undefinedCount = 0;
        const n = arr.length;
        const result = [...arr];

        for (let i = 0; i < n; i++) {
            if (this.countUndefined(result[i])) undefinedCount++;
        }

        let gap = Math.floor(n / 2);
        while (gap > 0) {
            for (let i = gap; i < n; i++) {
                let temp = result[i];
                let j = i;

                while (j >= gap && !this.countUndefined(temp)) {
                    comparisons++;
                    if (this.countUndefined(result[j - gap])) {
                        result[j] = result[j - gap];
                        j -= gap;
                        swaps++;
                        continue;
                    }

                    const shouldMove = ascending
                        ? result[j - gap] > temp
                        : result[j - gap] < temp;

                    if (!shouldMove) break;

                    result[j] = result[j - gap];
                    j -= gap;
                    swaps++;
                }
                result[j] = temp;
            }
            gap = Math.floor(gap / 2);
        }

        this.#logResults("Shell Sort", comparisons, swaps, undefinedCount, n);
        return result;
    }

    
    static quickSort(arr, ascending = true) {
        let comparisons = 0;
        let swaps = 0;
        let undefinedCount = 0;
        const n = arr.length;
        const result = [...arr];

        for (let i = 0; i < n; i++) {
            if (this.countUndefined(result[i])) undefinedCount++;
        }

        const quickSortHelper = (array, low, high) => {
            if (low < high) {
                const pivotIndex = partition(array, low, high);
                quickSortHelper(array, low, pivotIndex - 1);
                quickSortHelper(array, pivotIndex + 1, high);
            }
        };

        const partition = (array, low, high) => {
            let pivot = array[high];
            let i = low - 1;

            for (let j = low; j < high; j++) {
                if (this.countUndefined(array[j])) continue;
                if (this.countUndefined(pivot)) {
                    i++;
                    [array[i], array[j]] = [array[j], array[i]];
                    swaps++;
                    continue;
                }

                comparisons++;
                const shouldSwap = ascending
                    ? array[j] <= pivot
                    : array[j] >= pivot;

                if (shouldSwap) {
                    i++;
                    [array[i], array[j]] = [array[j], array[i]];
                    swaps++;
                }
            }
            [array[i + 1], array[high]] = [array[high], array[i + 1]];
            swaps++;
            return i + 1;
        };

        quickSortHelper(result, 0, n - 1);
        this.#logResults("Quick Sort", comparisons, swaps, undefinedCount, n);
        return result;
    }
}
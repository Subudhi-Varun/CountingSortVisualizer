window.myLib = {};

// Create an array of random numbers b/w 1 to 20.
var randomNumbers = [];
var maxx = 15;
var minn = 1;
for(let i=0; i<10; i++) {
    randomNumbers[i] = (Math.floor(Math.random() * (maxx - minn + 1) + minn));
}

// Add a refresh button.
document.getElementById("refreshButton").addEventListener("click", () => {
    window.location.reload();
});

// Create a DOM and append random numbers to container.
var container = document.getElementById('container');
for(let i=0; i<10; i++) {
    let newDiv = document.createElement('div');
    newDiv.className = 'generatedNumbers';
    newDiv.textContent = randomNumbers[i];
    newDiv.style.height = randomNumbers[i]*20 + "px";
    container.appendChild(newDiv);
}

// Create empty boxes for counting sort.
var container2 = document.getElementById('container2');
for(let i=1; i<=15; i++) {
    var bucketWrapper = document.createElement('div');
    bucketWrapper.className = 'bucketWrapper';
    bucketWrapper.innerHTML = '<div class="countingBuckets" id="bucket-' + (i) + '">0</div>' + '<div>' + (i) + '</div>';
    container2.appendChild(bucketWrapper);
}

// Create empty boxes for final sorted list.
var container3 = document.getElementById('container3');
for(let i=0; i<10; i++) {
    let newDiv = document.createElement('div');
    newDiv.className = 'sortedNumbers';
    container3.appendChild(newDiv);
}

// Add event listerner for start sorting button to put count in buckets.
document.getElementById('sortingButton').addEventListener('click', sortingAlgo);

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function sortingAlgo() {

    let buttonElement = document.getElementById('sortingButton');
    buttonElement.setAttribute("disabled", true);

    console.log('sorting started');
    let numsElements = document.getElementsByClassName('generatedNumbers');
    for(let i=0; i<numsElements.length; i++) {
        // Highlight the current element.
        numsElements[i].style.border = '5px solid red';

        // Select the bucket to increase value.
        let bucketSelector = document.getElementById('bucket-' + numsElements[i].textContent);

        // Highlight the bucket
        bucketSelector.style.border = '5px solid red';

        // Sleep for 1 sec.
        await sleep(1000);

        // Increment the bucket value.
        let bucketCurrentCount = parseInt(bucketSelector.textContent);
        bucketCurrentCount = bucketCurrentCount + 1;
        bucketSelector.textContent = bucketCurrentCount;

        // Sleep for 2 seconds.
        await sleep(1000);

        // Unhighlight the current element.
        bucketSelector.style.border = '5px solid black';
        numsElements[i].style.border = '5px solid black';
    }
    console.log('sorting completed');

    // Output the final sorted numbers.
    var iterator = 0;
    let sortedElements = document.getElementsByClassName('sortedNumbers');
    let bucketElements = document.getElementsByClassName('countingBuckets');

    // Itearte over the bucket.
    for(let i=0; i<bucketElements.length; i++) {
        let bucketCount = parseInt(bucketElements[i].textContent);
        let bucketValue = bucketElements[i].nextSibling.textContent;

        // Highlight bucket.
        bucketElements[i].style.border = '5px solid red';

        for(let j=0; j<bucketCount; j++) {
            // Highlight sorted placeholder
            sortedElements[iterator].style.border = '5px solid red';

            // Sleep
            await sleep(1000);

            // Insert the value into sorted list.
            sortedElements[iterator].textContent = bucketValue;
            sortedElements[iterator].style.height = bucketValue*20 + "px";
            sortedElements[iterator].style.backgroundColor = "green";

            // Sleep.
            await sleep(1000);

            // Unhighlist placeholder.
            sortedElements[iterator].style.border = '2px solid black';

            // Move to next placeholder.
            iterator++;
        }

        // Sleep
        await sleep(1000);

        // Unhighlight bucket.
        bucketElements[i].style.border = '2px solid black';
    }
}




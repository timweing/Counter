pragma solidity ^0.5.0;

contract Counter {
    int private count = 100;

    function incrementCounter() public {
        count += 1;
    }
    function decrementCounter() public {
        count -= 1;
    }
    function getCount() public view returns (int) {
        return count;
    }
}

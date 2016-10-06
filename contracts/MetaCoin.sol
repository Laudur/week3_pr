import "ConvertLib.sol";

// This is just a simple example of a coin-like contract.
// It is not standards compatible and cannot be expected to talk to other
// coin/token contracts. If you want to create a standards-compliant
// token, see: https://github.com/ConsenSys/Tokens. Cheers!

contract MetaCoin {
        address addA = 0xc46e52af965e4fd8679e267ac4adc8e844f8dab0;
        address addB = 0xd1756e5d57f6e7834455459dceaa141aa7be52cc;

	mapping (address => uint) balances;

	event Transfer(address indexed _from, address indexed _to, uint256 _value);

	function MetaCoin() {
		balances[tx.origin] = 10000;
	}

	function sendCoin(address receiver, uint amount) returns(bool sufficient) {
		if (balances[msg.sender] < amount) return false;
		balances[msg.sender] += amount;
		balances[receiver] += amount;
		Transfer(msg.sender, receiver, amount);
		return true;
	}
	
	function (){
	    donateSplit(this.balance);
	}

	function getBalance() constant returns(uint) {
		return this.balance;
	}
	
	function getAddress() constant returns(address) {
		return this;
	}

	function donateSplit(uint amount) returns(bool sufficient) {
                
		if (!addA.send(amount/2))
			return false;
		
		Transfer(this, addA, amount/2);
                
                if (!addB.send(amount/2))
			return false;
		
		Transfer(this, addB, amount/2);
            
		return true;
	}

	function getBalanceA() constant returns(uint) {
		return addA.balance;
	}

	function getBalanceB() constant returns(uint) {
		return addB.balance;
	}

}

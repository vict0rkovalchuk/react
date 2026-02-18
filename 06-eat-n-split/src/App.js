import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];


function Button({ onClick, children }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}


export default function App() {
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [friends, setFriends] = useState([...initialFriends]);
  const [selectedFriend, setSelectedFriend] = useState(null);

  function handleShowAddFriend() {
    setShowAddFriend(prevShowAddFriend => !prevShowAddFriend);
  }

  function handleAddFriend(newFriend) {
    setFriends(prevFriends => [...prevFriends, newFriend]);
    setShowAddFriend(false);
  }

  function handleSelectFriend(friend) {
    setSelectedFriend(prevSelectedFriend => prevSelectedFriend?.id === friend.id ? null : friend);
    setShowAddFriend(false);
  }

  function handleSplitBill(value) {
    setFriends(prevFriends => 
      prevFriends.map(friend => 
        friend.id === selectedFriend.id ? { ...friend, balance: friend.balance + value } : friend
      )
    );
    setSelectedFriend(null);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList 
          friends={friends} 
          selectedFriend={selectedFriend}
          onSelectFriend={handleSelectFriend}
        />

        {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend}/>}
        
        <Button 
          onClick={handleShowAddFriend}
        >
          {showAddFriend ? 'Close' : 'Add friend'}
        </Button>
      </div>

      {selectedFriend && <FormSplitBill selectedFriend={selectedFriend} onSplitBill={handleSplitBill}/>}
    </div>
  );
}

function FriendsList({ friends, selectedFriend, onSelectFriend }) {
  return (
    <ul>
      {friends.map(friend => (
        <Friend 
          friend={friend} 
          selectedFriend={selectedFriend} 
          onSelectFriend={onSelectFriend} 
          key={friend.id}
        />
      ))}
    </ul>
  );
}

function Friend({ friend, selectedFriend, onSelectFriend }) {
  const { id, name, image, balance } = friend;
  const isSelected = selectedFriend?.id === id;

  return (
    <li className={isSelected ? 'selected' : ''}>
      <img src={image} alt={name} />
      <h3>{name}</h3>
      {balance < 0 && <p className="red">You owe {name} {Math.abs(balance)}€</p>}
      {balance > 0 && <p className="green">{name} owes you {balance}€</p>}
      {balance === 0 && <p>You and {name} are even</p>}

      <Button onClick={() => onSelectFriend(friend)}>
        {isSelected ? 'Close' : 'Select'}
      </Button>
    </li>
  );
}

function FormAddFriend({ onAddFriend }) {
  const [name, setName] = useState('');
  const [image, setImage] = useState('https://i.pravatar.cc/48');

  function handleSubmit(e) {
    e.preventDefault();

    const id = crypto.randomUUID();

    const newFriend = {
      id,
      name,
      image: `${image}?u=${id}`,
      balance: 0
    }

    onAddFriend(newFriend);

    setName('');
    setImage('https://i.pravatar.cc/48');
  }
  
  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>👭 Friend Name</label>
      <input 
        type="text" 
        value={name} 
        onChange={e => setName(e.target.value)}
        required
      />

      <label>🌄 Image URL</label> 
      <input 
        type="text" 
        value={image} 
        onChange={e => setImage(e.target.value)}
        required
      />

      <Button>Add</Button>
    </form>
  );
}

function FormSplitBill({ selectedFriend: { name }, onSplitBill }) {
  const [bill, setBill] = useState('');
  const [paidByUser, setPaidByUser] = useState('');
  const paidByFriend = bill ? bill - paidByUser : '';
  const [whoIsPaying, setWhoIsPaying] = useState('user');

  function handleSubmit(e) {
    e.preventDefault();

    onSplitBill(whoIsPaying === 'user' ? paidByFriend : -paidByUser);
  }

  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Split a bill with {name}</h2>

      <label>💰 Bill value</label> 
      <input 
        type="text" 
        value={bill} 
        onChange={(e) => setBill(+e.target.value)}
        required
      />

      <label>🧍‍♂️ Your expense</label> 
      <input 
        type="text" 
        value={paidByUser} 
        onChange={(e) => setPaidByUser(+e.target.value > bill ? paidByUser : +e.target.value)}
        required
      />

      <label>👭 {name}'s expense</label> 
      <input type="text" value={paidByFriend} disabled/>

      <label>🤑 Who is paying the bill?</label> 
      <select value={whoIsPaying} onChange={(e) => setWhoIsPaying(e.target.value)}>
        <option value="user">You</option>
        <option value="friend">{name}</option>
      </select>

      <Button>Split Bill</Button>
    </form>
  );
}
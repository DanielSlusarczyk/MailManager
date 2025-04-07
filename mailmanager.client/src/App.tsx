import './App.css';
import ContactsList from './components/ContactList';
import GroupsList from './components/GroupsList';

function App() {
    return (
        <div className="bg-gray-100">
            <ContactsList />
            <GroupsList />
        </div>
    );
}

export default App;
import ContactsList from './components/lists/ContactList';
import GroupsList from './components/lists/GroupsList';

function App() {
    return (
        <div className="bg-gray-100 rounded w-11/12 m-auto mt-10 min-w-96">
            <ContactsList />
            <GroupsList />
        </div>
    );
}

export default App;
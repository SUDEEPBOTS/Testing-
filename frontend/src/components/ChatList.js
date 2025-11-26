import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';

const ChatList = ({ chats, onSelectChat }) => {
  return (
    <div className="w-1/4 bg-gray-900 p-4 overflow-y-auto">
      {chats.map((chat) => (
        <motion.div
          key={chat._id}
          className="p-3 mb-2 bg-white/10 backdrop-blur-md rounded-lg cursor-pointer"
          whileHover={{ scale: 1.05 }}
          onClick={() => onSelectChat(chat)}
        >
          <h3 className="text-white">{chat.name || chat.participants[0].name}</h3>
        </motion.div>
      ))}
    </div>
  );
};

export default ChatList;

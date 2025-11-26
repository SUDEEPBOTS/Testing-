import { motion } from 'framer-motion';

const Message = ({ message, isOwn }) => {
  return (
    <motion.div
      className={`p-2 mb-2 rounded-lg ${isOwn ? 'bg-blue-500 text-white ml-auto' : 'bg-gray-300 text-black'}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {message.content}
    </motion.div>
  );
};

export default Message;

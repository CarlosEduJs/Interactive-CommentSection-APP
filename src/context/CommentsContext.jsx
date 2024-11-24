import { createContext, useState, useContext, useEffect } from "react";
import api from "../services/api";

const CommentsContext = createContext();

const CommentProvider = ({ children }) => {
  const [comments, setComments] = useState([]);
  const fetchComments = async () => {
    try {
      const response = await api.get("/comments");
      if (response.status === 200) {
        setComments(response.data);
      }
    } catch (error) {
      console.error("Erro ao buscar comentários", error);
      setComments([]);
    }
  };
  const updateComments = async () => {
    try {
      const response = await api.get("/comments");
      if (response.status === 200) {
        setComments([...response.data]);
        console.log(response.data);
      }
    } catch (error) {
      console.error("Erro ao atualizar comentários", error);
      setComments([]);
    }
  };
  useEffect(() => {
    fetchComments();
  }, []);
  return (
    <CommentsContext.Provider value={{ comments, setComments, updateComments }}>
      {children}
    </CommentsContext.Provider>
  );
};

const useComments = () => useContext(CommentsContext);

export { CommentProvider, useComments };

import { useState, useEffect } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";

export default function useApiKey() {
  const [apiKey, setApiKey] = useState("");

  useEffect(() => {
    const fetchApiKey = async () => {
      const db = getFirestore();
      const apiKeysCollection = collection(db, "API_KEYS");
      const apiKeysSnapshot = await getDocs(apiKeysCollection);
      const apiKeyDoc = apiKeysSnapshot.docs[0];
      setApiKey(apiKeyDoc.data().openAi_key);
    };

    fetchApiKey();
  }, []);

  return apiKey;
}

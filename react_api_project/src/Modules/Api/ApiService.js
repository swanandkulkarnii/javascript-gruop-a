const ApiService = () => {
  const data = JSON.parse(localStorage.getItem("Apis"));
  return data;
};

export default ApiService;

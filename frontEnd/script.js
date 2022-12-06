const getMemberships = async () => {
  try {
    const response = await fetch("http://localhost:5000/services/");
    const memberships = await response.json();
    console.log(memberships);
    return memberships;
  } catch (error) {
    console.error(error);
  }
};
getMemberships();

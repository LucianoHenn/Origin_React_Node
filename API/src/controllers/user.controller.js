const allAcces = (req, res) => {
  res.status(200).send("Public Content.");
};

const userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

export const methods = {
  allAcces,
  userBoard,
};

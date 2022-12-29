const getMemberships = async () => {
  try {
    const response = await fetch("http://localhost:5000/memberships/");
    const memberships = await response.json();

    renderMembershipTable(memberships);
  } catch (error) {
    console.error(error);
  }
};
getMemberships();

const currency = "$";

const renderMembershipTable = (memberships) => {
  const sectionContainer = document.querySelector("#cards-section");

  sectionContainer.replaceChildren();

  memberships.forEach((membership) => {
    const { _id, name, price, description } = membership;

    const membershipCard = document.createElement("div");
    membershipCard.className = "membership-card";

    const membershipTypeCard = document.createElement("div");
    membershipTypeCard.className = "membership-card-type";

    const membershipType = document.createElement("h2");
    const membershipDescriptionEl = document.createElement("p");

    const deleteMembershipContainer = document.createElement("div");
    deleteMembershipContainer.className = "delete-container-membership";

    membershipType.textContent = `${currency}${price} ${name}`;
    membershipDescriptionEl.textContent = description;

    const deleteMembershipButton = document.createElement("button");
    deleteMembershipButton.id = _id;
    deleteMembershipButton.className = "delete-membership-button";
    deleteMembershipButton.innerHTML = '<i class="fa fa-trash"> </i>';

    membershipTypeCard.append(membershipType, membershipDescriptionEl);

    deleteMembershipContainer.append(deleteMembershipButton);

    membershipCard.append(membershipTypeCard, deleteMembershipContainer);

    sectionContainer.append(membershipCard);

    const deleteMembership = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/membership/${deleteMembershipButton.id}`,
          {
            method: "DELETE",
          }
        );
        const isPostDeleted = response.ok;

        if (isPostDeleted) {
          await getMemberships();
        }
      } catch (err) {
        console.log(err);
      }
    };
    deleteMembershipButton.addEventListener("click", deleteMembership);
  });
};

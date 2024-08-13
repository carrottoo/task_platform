const userMapping = {
  // User data fields
  firstName: "first_name",
  lastName: "last_name",
  username: "username",
  email: "email",
  password: "password",
  lastLogin: "last_login",
  dateJoined: "date_joined",
};

const taskMapping = {
  id: "id",
  name: "name",
  description: "description",
  output: "output",
  status: "status",
  assignee: "assignee_name",
  owner: "owner_name",
  isSubmitted: "is_submitted",
  isApproved: "is_approved",
  isActive: "is_active",
  createdOn: "created_on",
  submittedOn: "submitted_on",
  updatedOn: "updated_on",
  approvedOn: "approved_on",
};

export { userMapping, taskMapping };

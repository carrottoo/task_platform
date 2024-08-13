import callApi from "./utils";
import config from "../config/config";
import { taskMapping } from "./mapping";
import { formatTaskData } from "./utils";

export async function listRetrival(
  token,
  url,
  objectName,
  setSessionExpiredOpen,
  setError,
  setLoading,
  filter = false,
  filterCriteria = null,
) {
  try {
    const result = await callApi(token, url);

    if (result.sessionExpired) {
      setSessionExpiredOpen(true);
      return;
    }

    if (result.error) {
      setError("Unable to fetch " + objectName + " data");
      return;
    }

    let data = result.ok.results || [];

    if (filter) {
      if (typeof filterCriteria === "function") {
        data = data.filter(filterCriteria);
      } else {
        setError(`Invalid filter criteria for ${objectName} data`);
        return;
      }
    }

    return objectName === "task" ? formatTaskData(data, taskMapping) : data;
  } catch (error) {
    setError(error.message || "Unable to fetch " + objectName + " data");
  } finally {
    setLoading(false);
  }
}

export async function deleteObject(
  token,
  baseUrl,
  objectId,
  alternativeErrorMessage,
  supplementPermissionMessage,
  successMessage,
  setSessionExpiredOpen,
  setAlertMessage,
  setAlertSeverity,
  setShowAlert,
  navigate,
) {
  const url = `${baseUrl}${objectId}/`;

  try {
    const result = await callApi(token, url, "DELETE");

    if (result.sessionExpired) {
      setSessionExpiredOpen(true);
      return;
    }

    if (result.permissionDenied) {
      setAlertMessage(result.permissionDenied + supplementPermissionMessage);
      setAlertSeverity("error");
      setShowAlert(true);
      return;
    }

    if (result.error) {
      setAlertMessage(
        result.error.message ? result.error.message : alternativeErrorMessage,
      );
      setAlertSeverity("error");
      setShowAlert(true);
      return;
    }

    setAlertMessage(successMessage);
    setAlertSeverity("success");
    setShowAlert(true);

    setTimeout(() => {
      navigate(0); // Reload the current page
    }, 800);
  } catch (error) {
    setAlertMessage(error.message ? error.message : alternativeErrorMessage);
    setAlertSeverity("error");
    setShowAlert(true);
  }
}

export async function isTaskUnassigned(token, task) {
  if (!task || !task.id) {
    return null; // Return null if the task object is invalid
  }

  const url = `${config.API_BASE_URL}/tasks/${task.id}/`;

  try {
    const result = await callApi(token, url);

    if (result.ok && result.ok.assignee === null) {
      return true;
    }

    return null;
  } catch (error) {
    return null; // Return null if there is an error
  }
}

export async function patchingTask(
  patchUrl,
  token,
  body,
  field,
  errorMessage,
  successMessage,
  setSessionExpiredOpen,
  setAlertMessage,
  setAlertSeverity,
  setShowAlert,
  navigate,
) {
  // const patchUrl = config.API_BASE_URL + "/tasks/" + task.id + '/';

  try {
    const result = await callApi(token, patchUrl, "PATCH", body);

    if (result.sessionExpired) {
      setSessionExpiredOpen(true);
      return;
    }

    if (result.error) {
      const message = result.error[field].message || errorMessage;
      setAlertMessage(message);
      setAlertSeverity("error");
      setShowAlert(true);
      return;
    }

    setAlertMessage(successMessage);
    setAlertSeverity("success");
    setShowAlert(true);

    setTimeout(() => {
      navigate(0); // Reload the current page
    }, 500);
  } catch (error) {
    const message = error.message || errorMessage;
    setAlertMessage(message);
    setAlertSeverity("error");
    setShowAlert(true);
  }
}

export async function setLikeStatus(
  token,
  url,
  object,
  body,
  updateBody,
  setSessionExpiredOpen,
  setAlertMessage,
  setAlertSeverity,
  setShowAlert,
  isLike = true,
  isProperty = false,
) {
  try {
    const retrievedResult = await callApi(token, url);

    if (retrievedResult.sessionExpired) {
      setSessionExpiredOpen(true);
      return;
    }

    let field;
    let status;

    if (isProperty) {
      field = "property";
      status = "is_interested";
    } else {
      field = "task";
      status = "is_like";
    }

    const existingRecord = retrievedResult.ok.results.find((record) => {
      return isLike
        ? record[field] === object.id && !record[status]
        : record[field] === object.id && record[status];
    });

    if (existingRecord) {
      const updateUrl = `${url}${existingRecord.id}/`;
      const result = await callApi(token, updateUrl, "PATCH", updateBody);
      apiResponseToLikeStatus(
        result,
        isLike ? "Like" : "Dislike",
        isLike ? "liked" : "disliked",
        setAlertMessage,
        setAlertSeverity,
        setShowAlert,
      );
    } else {
      const result = await callApi(token, url, "POST", body);
      apiResponseToLikeStatus(
        result,
        isLike ? "Like" : "Dislike",
        isLike ? "liked" : "disliked",
        setAlertMessage,
        setAlertSeverity,
        setShowAlert,
      );
    }
  } catch (error) {
    // Handle general fetch errors
    setAlertMessage(
      error.message || "An error occurred while processing your request.",
    );
    setAlertSeverity("error");
    setShowAlert(true);
  }
}

function apiResponseToLikeStatus(
  result,
  action,
  pastParticiple,
  setAlertMessage,
  setAlertSeverity,
  setShowAlert,
) {
  if (result.error) {
    const responseError = result.error;
    let message = responseError || "";
    if (responseError.message) {
      message = responseError.message;
    } else if (
      responseError.non_field_errors &&
      responseError.non_field_errors.code === "unique"
    ) {
      message = `You have already marked this ${action === "Like" ? "task" : "tag"} as '${pastParticiple}'.`;
    } else {
      message = `Unable to ${action} the selected ${action === "Like" ? "task" : "tag"}.`;
    }
    setAlertMessage(message);
    setAlertSeverity("error");
  } else {
    setAlertMessage("Your action was successful!");
    setAlertSeverity("success");
  }

  setShowAlert(true);
}

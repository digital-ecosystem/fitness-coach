import { SUPERCHAT_API_KEY, SUPERCHAT_CHANNEL_ID } from "../config/index.js";

export async function getConveration(contact_id) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "X-API-KEY": SUPERCHAT_API_KEY,
    },
  };
  return fetch(
    `https://api.superchat.com/v1.0/contacts/${contact_id}/conversations`,
    options
  )
    .then((response) => response.json())
    .catch((err) => console.error(err));
}

export async function getSuperchatRecord(contact_id) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "X-API-KEY": SUPERCHAT_API_KEY,
    },
  };

  return await fetch(
    `https://api.superchat.com/v1.0/contacts/${contact_id}`,
    options
  )
    .then((response) => response.json())
    .catch((err) => console.error(err));
}

/*function to update the superchat reccord with the new thread id*/
export async function updateSuperchatRecord(contact_id, threadId) {
  const url = `https://api.superchat.com/v1.0/contacts/${contact_id}`;
  const options = {
    method: "PATCH",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "X-API-KEY": SUPERCHAT_API_KEY,
    },
    body: JSON.stringify({
      custom_attributes: [
        {
          id: "ca_QJ2EPXhGvD6LD8VfWyMxp",
          value: threadId,
        },
      ],
    }),
  };
  return await fetch(url, options)
    .then((response) => response.json())
    .catch((err) => console.error(err));
}

export async function sendMessage(templateId, video_id, contact_id) {
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "X-API-KEY": SUPERCHAT_API_KEY,
    },
    body: JSON.stringify({
      to: [{ identifier: contact_id }],
      from: { channel_id: SUPERCHAT_CHANNEL_ID, name: "+4366499704086" },
      content: {
        type: "whats_app_template",
        template_id: templateId,
        file: { id: video_id },
      },
    }),
  };

  return fetch("https://api.superchat.com/v1.0/messages", options)
    .then((response) => response.json())
    .catch((err) =>
      console.error(
        "something went wrong wiht sending the message through Superchat",
        err
      )
    );
}

export async function listAllContacts(after) {
  let url = "https://api.superchat.com/v1.0/contacts?limit=100";
  if (after)
  {
    url = url + "&after=" + after;
  }
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "X-API-KEY": SUPERCHAT_API_KEY,
    },
  };

  return await fetch(url, options)
    .then((res) => res.json())
    .catch((err) => console.error(err));
}

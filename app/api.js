import axios from "axios";

export async function getCompanyData() {
  try {
    const response = await axios.get("https://api.spacexdata.com/v4/company");
    if (response) {
      return { boolean: true, data: response.data };
    } else {
      return { boolean: false };
    }
  } catch (error) {
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      console.log(error.request);
    } else {
      return {
        boolean: false,
        error: `Could not fetch comapny data: ${error.message}`,
      };
    }
  }
}

export async function getCompanyHistoryData() {
  try {
    const response = await axios.get("https://api.spacexdata.com/v4/history");
    if (response) {
      return { boolean: true, data: response.data };
    } else {
      return { boolean: false };
    }
  } catch (error) {
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      console.log(error.request);
    } else {
      return {
        boolean: false,
        error: `Could not fetch comapny history data: ${error.message}`,
      };
    }
  }
}

export async function getLaunchDataById(launchId) {
  try {
    if (!launchId || typeof launchId !== "string")
      return { boolean: false, error: `Invalid Launch Id passed` };

    const inputQuery = {
      query: {},
      options: {
        populate: [
          {
            path: "ships",
            select: { name: 1 },
          },
          {
            path: "payloads",
            select: { name: 1 },
          },
          {
            path: "cores.core",
            select: { serial: 1 },
          },
          {
            path: "launchpad",
            select: { name: 1 },
          },
          { path: "rocket", select: { name: 1 } },
        ],
      },
    };

    const response = await axios.get(
      `https://api.spacexdata.com/v5/launches/${launchId}`
    );
    if (response) {
      return { boolean: true, data: response.data };
    } else {
      return { boolean: false };
    }
  } catch (error) {
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
      return {
        boolean: false,
        error: `Could not fetch comapny Launch data: ${error.message}, ${error.response}, ${error.status}, ${error.response.headers}`,
      };
    } else if (error.request) {
      console.log(error.request);
      return {
        boolean: false,
        error: `Could not fetch comapny Launch data: ${error.request}`,
      };
    } else {
      return {
        boolean: false,
        error: `Could not fetch comapny Launch data: ${error.message}`,
      };
    }
  }
}

// export async function getLaunchData(page = 1) {
//   try {
//     const response = await axios.post(
//       `https://api.spacexdata.com/v5/launches/query`,
//       {
//         query: {},
//         options: { page },
//       }
//     );
//     if (response) {
//       return { boolean: true, data: response.data };
//     } else {
//       return { boolean: false };
//     }
//   } catch (error) {
//     if (error.response) {
//       console.log(error.response.data);
//       console.log(error.response.status);
//       console.log(error.response.headers);
//     } else if (error.request) {
//       console.log(error.request);
//     } else {
//       return {
//         boolean: false,
//         error: `Could not fetch comapny launch data: ${error.message}`,
//       };
//     }
//   }
// }

export async function getCoresData({ name = "", page = 1 }) {
  console.log(page, name);
  try {
    let inputQuery = null;
    if (name !== "") {
      inputQuery = {
        query: { name: { $regex: name, $options: "i" } },
        options: {
          page,
          // populate: [
          // ],
        },
      };
    } else {
      inputQuery = {
        query: {},
        options: {
          page,
        },
      };
    }
    const response = await axios.post(
      `https://api.spacexdata.com/v4/cores/query`,
      inputQuery
    );
    if (response) {
      return { boolean: true, data: response.data };
    } else {
      return { boolean: false };
    }
  } catch (error) {
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      console.log(error.request);
    } else {
      return {
        boolean: false,
        error: `Could not fetch comapny launch data: ${error.message}`,
      };
    }
  }
}

export async function getLaunchData({ name = "", page = 1 }) {
  console.log(page, name);
  try {
    let inputQuery = null;
    if (name !== "") {
      inputQuery = {
        query: { name: { $regex: name, $options: "i" } },
        options: {
          page,
          populate: [
            {
              path: "ships",
              select: { name: 1 },
            },
            {
              path: "payloads",
              select: { name: 1 },
            },
            {
              path: "cores.core",
              select: { serial: 1 },
            },
            {
              path: "launchpad",
              select: { name: 1 },
            },
            { path: "rocket", select: { name: 1 } },
          ],
        },
      };
    } else {
      inputQuery = {
        query: {},
        options: {
          page,
          populate: [
            {
              path: "ships",
              select: {
                name: 1,
                roles: 1,
                year_built: 1,
                active: 1,
                link: 1,
                image: 1,
              },
            },
            {
              path: "payloads",
              select: {
                name: 1,
                manufacturers: 1,
                mass_kg: 1,
                mass_lbs: 1,
                mean_anomaly: 1,
              },
            },
            {
              path: "cores.core",
              select: {
                serial: 1,
                last_update: 1,
                status: 1,
                reuse_count: 1,
              },
              populate: [
                {
                  path: "launches",
                  select: { name: 1 },
                },
              ],
            },
            {
              path: "launchpad",
              select: {
                name: 1,
                locality: 1,
                region: 1,
                launch_attempts: 1,
                launch_successes: 1,
                status: 1,
              },
            },
            {
              path: "rocket",
              select: {
                name: 1,
                active: 1,
                desription: 1,
                success_rate_pct: 1,
                cost_per_launch: 1,
                wikipedia: 1,
              },
            },
          ],
        },
      };
    }
    const response = await axios.post(
      `https://api.spacexdata.com/v5/launches/query`,
      inputQuery
    );
    if (response) {
      return { boolean: true, data: response.data };
    } else {
      return { boolean: false };
    }
  } catch (error) {
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      console.log(error.request);
    } else {
      return {
        boolean: false,
        error: `Could not fetch comapny launch data: ${error.message}`,
      };
    }
  }
}

export async function getRocketData({ name = "", page = 1 }) {
  console.log(page, name);
  try {
    let inputQuery = null;
    if (name !== "") {
      inputQuery = {
        query: { name: { $regex: name, $options: "i" } },
        options: {
          page,
          populate: [],
        },
      };
    } else {
      inputQuery = {
        query: {},
        options: {
          page,
          populate: [],
        },
      };
    }
    const response = await axios.post(
      `https://api.spacexdata.com/v4/rockets/query`,
      inputQuery
    );
    if (response) {
      return { boolean: true, data: response.data };
    } else {
      return { boolean: false };
    }
  } catch (error) {
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      console.log(error.request);
    } else {
      return {
        boolean: false,
        error: `Could not fetch comapny launch data: ${error.message}`,
      };
    }
  }
}

export async function getShipsById(shipId) {
  try {
    if (!shipId || typeof shipId !== "string")
      return { boolean: false, error: `Invalid ship Id passed` };

    const response = await axios.get(
      `https://api.spacexdata.com/v4/ships/${shipId}`
    );
    if (response) {
      return { boolean: true, data: response.data };
    } else {
      return { boolean: false };
    }
  } catch (error) {
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      console.log(error.request);
    } else {
      return {
        boolean: false,
        error: `Could not fetch ships data: ${error.message}`,
      };
    }
  }
}

export async function getLaunchPadsById(launchPadId) {
  try {
    if (!launchPadId || typeof launchPadId !== "string")
      return { boolean: false, error: `Invalid Launch Pad Id passed` };

    const response = await axios.get(
      `https://api.spacexdata.com/v4/launchpads/${launchPadId}`
    );
    if (response) {
      return { boolean: true, data: response.data };
    } else {
      return { boolean: false };
    }
  } catch (error) {
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      console.log(error.request);
    } else {
      return {
        boolean: false,
        error: `Could not fetch launch pad data: ${error.message}`,
      };
    }
  }
}

export async function getRocketById(rocketId) {
  try {
    if (!rocketId || typeof rocketId !== "string")
      return { boolean: false, error: `Invalid Launch Pad Id passed` };

    const response = await axios.get(
      `https://api.spacexdata.com/v4/rockets/${rocketId}`
    );
    console.log("123", response);
    if (response) {
      return { boolean: true, data: response.data };
    } else {
      return { boolean: false };
    }
  } catch (error) {
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      console.log(error.request);
    } else {
      return {
        boolean: false,
        error: `Could not fetch rocket data: ${error.message}`,
      };
    }
  }
}

export async function getPayloadById(payloadId) {
  console.log("Payload ID", payloadId);
  try {
    if (!payloadId || typeof payloadId !== "string")
      return { boolean: false, error: `Invalid Launch Pad Id passed` };

    const response = await axios.get(
      `https://api.spacexdata.com/v4/payloads/${payloadId}`
    );
    if (response) {
      return { boolean: true, data: response.data };
    } else {
      return { boolean: false };
    }
  } catch (error) {
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      console.log(error.request);
    } else {
      return {
        boolean: false,
        error: `Could not fetch rocket data: ${error.message}`,
      };
    }
  }
}

export async function getCoreById(coreId) {
  try {
    if (!coreId || typeof coreId !== "string")
      return { boolean: false, error: `Invalid Launch Pad Id passed` };

    const response = await axios.get(
      `https://api.spacexdata.com/v4/cores/${coreId}`
    );
    // console.log("response to getCoreById function in API", response);
    if (response) {
      return { boolean: true, data: response.data };
    } else {
      return { boolean: false };
    }
  } catch (error) {
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      console.log(error.request);
    } else {
      return {
        boolean: false,
        error: `Could not fetch rocket data: ${error.message}`,
      };
    }
  }
}

export async function getPayloadData({ name = "", page = 1 }) {
  console.log("Payload API Input:", page, name);
  try {
    let inputQuery = null;
    if (name !== "") {
      inputQuery = {
        query: { name: { $regex: name, $options: "i" } },
        options: {
          page,
          populate: [
            {
              path: "launch",
              select: {
                name: 1,
                details: 1,
                success: 1,
                links: 1,
                date_local: 1,
              },
            },
          ],
        },
      };
    } else {
      inputQuery = {
        query: {},
        options: {
          page,
          populate: [
            {
              path: "launch",
              select: {
                name: 1,
                details: 1,
                success: 1,
                links: 1,
                date_local: 1,
              },
            },
          ],
        },
      };
    }
    const response = await axios.post(
      `https://api.spacexdata.com/v4/payloads/query

`,
      inputQuery
    );
    if (response) {
      return { boolean: true, data: response.data };
    } else {
      return { boolean: false };
    }
  } catch (error) {
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      console.log(error.request);
    } else {
      return {
        boolean: false,
        error: `Could not fetch payload data: ${error.message}`,
      };
    }
  }
}

export async function getShipData({ name = "", page = 1 }) {
  console.log(page, name);
  try {
    let inputQuery = null;
    if (name !== "") {
      inputQuery = {
        query: { name: { $regex: name, $options: "i" } },
        options: {
          page,
          populate: [{ path: "launches", select: { name: 1 } }],
        },
      };
    } else {
      inputQuery = {
        query: {},
        options: {
          page,
          populate: [{ path: "launches", select: { name: 1 } }],
        },
      };
    }
    const response = await axios.post(
      `https://api.spacexdata.com/v4/ships/query`,
      inputQuery
    );
    if (response) {
      return { boolean: true, data: response.data };
    } else {
      return { boolean: false };
    }
  } catch (error) {
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      console.log(error.request);
    } else {
      return {
        boolean: false,
        error: `Could not fetch comapny launch data: ${error.message}`,
      };
    }
  }
}

export async function getLaunchPadsData({ name = "", page = 1 }) {
  console.log("Launchpad API Input:", page, name);
  try {
    let inputQuery = null;
    if (name !== "") {
      inputQuery = {
        query: { name: { $regex: name, $options: "i" } },
        options: {
          page,
        },
      };
    } else {
      inputQuery = {
        query: {},
        options: {
          page,
        },
      };
    }
    const response = await axios.post(
      `https://api.spacexdata.com/v4/launchpads/query`,
      inputQuery
    );
    if (response) {
      return { boolean: true, data: response.data };
    } else {
      return { boolean: false };
    }
  } catch (error) {
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      console.log(error.request);
    } else {
      return {
        boolean: false,
        error: `Could not fetch launchpad data: ${error.message}`,
      };
    }
  }
}

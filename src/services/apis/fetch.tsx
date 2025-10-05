export const Fetch = async (api: any) => {
  try {
    console.log("fetchberjalan");
    const response = await fetch(api);
    if (!response.ok) {
      throw new Error(`Error response ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

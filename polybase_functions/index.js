const { Polybase } =  require("@polybase/client");

const db = new Polybase({
  defaultNamespace: "pk/0xef0bffa8495694673bf3c1c01413e5ffe987b2fdc47a37b594f5688953c2d53dfc2d2f0a10b91d96354eaac73f6644702b0d7dfbc387dfa632938854eefcf3ef/test_app",
});

async function createSomething(object, tag, name) {
  await db.collection(object).create([tag, name]);
}

async function getSomething(object, tag) {
  const data = await db.collection(object).record(tag).get();
  return data;
}


async function run() {
 // await db.collection("City").create(["new-york", "New York"]); 
  try {
   // await db.collection("City").create(["pune", "Pune"]); 
   // await db.collection("City").record("new-york").call("setCountry", ["USA"]);
    //const data = await db.collection("City").record("new-york").get();
    await createSomething("City", "philly", "Philadelphia");
    const data = await getSomething("City", "philly");
    console.log(data);

  } catch (e) {
    //console.log("There seems to be an error");
    console.log(e);
  }

}
run();
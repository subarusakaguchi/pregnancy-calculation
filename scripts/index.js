function calculatePregnancyValues(inputDate) {
  const RESULT_ELEMENT = document.getElementById("result");

  const today = new Date();

  const dum = new Date(inputDate.value.replace(/-/g, "/").replace(/T.+/, ""));

  const diffInDays = Math.floor(
    (today.getTime() - dum.getTime()) / (24 * 60 * 60 * 1000)
  );

  const weeksAge = Math.floor(diffInDays / 7);

  const daysAge = diffInDays % 7;

  let ageInWeeks = "- A Idade gestacional é";

  if (weeksAge > 0) {
    ageInWeeks += ` ${weeksAge} semana${weeksAge === 1 ? "" : "s"}${
      daysAge > 0 ? "" : "."
    }`;
  }

  if (daysAge > 0) {
    if (ageInWeeks.length > 23) {
      ageInWeeks += " e ";
    }
    ageInWeeks += ` ${daysAge} dia${daysAge === 1 ? "" : "s"}.`;
  }

  if (weeksAge === 0 && daysAge === 0) {
    ageInWeeks += " de 0 dias.";
  }

  if (weeksAge < 0 || daysAge < 0) {
    ageInWeeks = "- Ainda não possui idade gestacional.";
  }

  RESULT_ELEMENT.innerHTML = `${ageInWeeks}</br>`;
  // ------------------------------------

  const monthOfDum = dum.getMonth();

  let dpp = new Date();
  let naegeleDay = dum.getDate() + 7;
  let naegeleValueMonth = 3;

  if (monthOfDum <= 2) {
    naegeleValueMonth = 9;

    if (naegeleDay > 31) {
      naegeleDay = naegeleDay - 31;
      naegeleValueMonth += 1;
    }

    let naegeleMonth = monthOfDum + 1 + naegeleValueMonth;

    let naegeleYear = new Date().getFullYear();

    if (naegeleMonth > 12) {
      naegeleMonth = 1;
      naegeleYear += 1;
    }

    dpp = new Date(
      `${naegeleYear}-${naegeleMonth}-${naegeleDay}`
        .replace(/-/g, "/")
        .replace(/T.+/, "")
    );
  } else if (monthOfDum >= 3) {
    if (naegeleDay > 31) {
      naegeleDay = naegeleDay - 31;
      naegeleValueMonth -= 1;
    }

    const naegeleMonth = monthOfDum + 1 - naegeleValueMonth;

    dpp = new Date(
      `${new Date().getFullYear() + 1}-${naegeleMonth}-${naegeleDay}`
        .replace(/-/g, "/")
        .replace(/T.+/, "")
    );
  }

  RESULT_ELEMENT.innerHTML += `- O dia provável do parto é: ${dpp.toLocaleDateString()}</br>`;
  // ------------------------------------

  const TWO_WEEKS_IN_MS = 2 * 7 * 24 * 60 * 60 * 1000;

  const conceptionDay = new Date(dum.getTime() + TWO_WEEKS_IN_MS);

  RESULT_ELEMENT.innerText += `- O dia provável da concepção é: ${conceptionDay.toLocaleDateString()}`;
}

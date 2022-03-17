let inputFilter = document.getElementById("inputFilter");
const filterList = () => {
  let input, filter, divGraber, cardTotal, resultText, resultParagraph, txtValue, paragraphValue, checkTitle, checkParagraph;
  input = document.getElementById("inputFilter");
  filter = input.value.toUpperCase();
  divGraber = document.getElementById("graberCursos");
  cardTotal = divGraber.getElementsByClassName('cardTotal');

  for (let i = 0; i < cardTotal.length; i++) {
  resultText = cardTotal[i].getElementsByTagName("h5")[0];
  resultParagraph = cardTotal[i].getElementsByTagName("p")[0];
  txtValue = resultText.textContent || txtValue.innerText;
  paragraphValue = resultParagraph.textContent || txtValue.innerText;

  checkTitle = txtValue.toUpperCase().indexOf(filter) > -1;
  checkParagraph = paragraphValue.toUpperCase().indexOf(filter) > -1

  checkTitle || checkParagraph ? cardTotal[i].style.display = "" : cardTotal[i].style.display = "none";

  }
}

if (typeof(inputFilter) != 'undefined' && inputFilter != null)
{
  inputFilter.addEventListener('keyup', filterList);
}


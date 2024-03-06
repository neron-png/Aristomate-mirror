<script>
  import VectorGreece from "$lib/components/language/Greece.svg"
  import VectorUSA from "$lib/components/language/USA.svg"
</script>
  
<div id = "flags">
  <div class = "flag-container">
    <img class = "flag" src={VectorGreece} alt="Greece">
    <p class = "flag-name">Ελληνικά</p>
  </div>

  <div class = "flag-container">
    <img class = "flag" src={VectorUSA} alt="USA">
    <p class = "flag-name">English (USA)</p>
  </div>

</div>


<style>
  #flags{
    margin-top: 3em;
    margin-inline: 1em;
    margin-bottom: 1em;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .flag-container{
    width: 45%;
    height:45%;
  }

  .flag{
    
  }

  .flag-name{
    font-size: 0.7em;
    text-align: center;
    margin-top: 0.2em;
  }

</style>
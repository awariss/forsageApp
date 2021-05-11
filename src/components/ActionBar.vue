/**
 * Bachelor thesis mobile application for beehive monitoring
 * Created by Jan Osolsobe (Faculty of Information Technology BUT)
 * Brno, Czech Republic
 */

 <template>
  <ActionBar>
    <StackLayout orientation="horizontal">
      <Label horizontalAlignment="left" width="70%" text="Forsage - App" />
      <Label width="20%" text="" />
    </StackLayout>
  </ActionBar>
</template>

<script>
export default {};
</script>

<style scoped>
label {
  text-align: left;
  font-size: 20;
  font-weight: normal;
}

ActionBar {
  background-color: #ffc107;
  color: #000000;
}
</style>

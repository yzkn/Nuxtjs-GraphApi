<template>
  <div class="container">
    <div>
      <div>
        <b-navbar class="mb-3" toggleable="lg" type="dark" variant="dark">
          <b-navbar-brand href="#">Nuxtjs-GraphApi</b-navbar-brand>

          <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

          <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
              <b-nav-item href="#">Link</b-nav-item>
              <b-nav-item href="#" disabled>Disabled</b-nav-item>
            </b-navbar-nav>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
              <b-nav-form>
                <b-form-input
                  size="sm"
                  class="mr-sm-2"
                  placeholder="Search"
                ></b-form-input>
                <b-button size="sm" class="my-2 my-sm-0" type="submit"
                  >Search</b-button
                >
              </b-nav-form>

              <b-nav-item-dropdown text="Lang" right>
                <b-dropdown-item href="#">EN</b-dropdown-item>
                <b-dropdown-item href="#">ES</b-dropdown-item>
                <b-dropdown-item href="#">RU</b-dropdown-item>
                <b-dropdown-item href="#">FA</b-dropdown-item>
              </b-nav-item-dropdown>

              <b-nav-item-dropdown right>
                <!-- Using 'button-content' slot -->
                <template v-slot:button-content>
                  <em>User</em>
                </template>
                <b-dropdown-item href="#">Profile</b-dropdown-item>
                <b-dropdown-item href="#">Sign Out</b-dropdown-item>
              </b-nav-item-dropdown>
            </b-navbar-nav>
          </b-collapse>
        </b-navbar>
      </div>
      <div>
        <b-button v-b-toggle.collapse-1>Toggle Collapse</b-button>
        <b-collapse id="collapse-1" class="mt-2">
          <b-card>
            <b-jumbotron
              header="BootstrapVue"
              lead="Bootstrap v4 Components for Vue.js 2"
            >
              <logo />
              <p>For more information visit website</p>
              <b-button variant="primary" href="#">More Info</b-button>
            </b-jumbotron>
          </b-card>
        </b-collapse>
      </div>
      <h1 class="title">
        Nuxtjs-GraphApi
      </h1>
      <h2 class="subtitle">
        My doozie Nuxt.js project
      </h2>
      <div>
        <div v-if="user">
          <div>Welcome {{ user.name }}</div>
          <div v-if="user.profile.jobTitle">
            Your job title is {{ user.profile.jobTitle }}
          </div>
          <div>
            <b-button variant="outline-primary" @click="$msal.signOut()"
              >Sign out</b-button
            >
          </div>
        </div>
        <div v-else>
          Please sign-in
          <b-button variant="outline-primary" @click="$msal.signIn()"
            >Sign in</b-button
          >
        </div>
        <div v-if="teams">
          <ul id="example-1">
            <li v-for="team in teams" v-bind:key="team.id">
              {{ team.id }}
            </li>
          </ul>
        </div>
      </div>
      <div class="links">
        <a href="https://nuxtjs.org/" target="_blank" class="button--green">
          Documentation
        </a>
        <a
          href="https://github.com/nuxt/nuxt.js"
          target="_blank"
          class="button--grey"
        >
          GitHub
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from "~/components/Logo.vue";
import { msalMixin } from "vue-msal";

export default {
  components: {
    Logo
  },
  computed: {
    user() {
      let user = null;
      if (this.msal.isAuthenticated) {
        // Note that the dollar sign ($) is missing from this.msal
        user = {
          ...this.msal.user,
          profile: {}
        };
        if (this.msal.graph && this.msal.graph.profile) {
          user.profile = this.msal.graph.profile;
        }
      }
      return user;
    },
    async teams() {
      let teams = null;
      if (this.msal.isAuthenticated) {
        if (this.msal.graph) {
          teams = await this.$msal.msGraph("/me/joinedTeams");
        }
      }
      console.log(teams);
      return teams;
    }
  },
  created() {
    console.log(process.env.GRAPH_CLIENT_ID);
    if (process.client) {
      if (!this.$msal.isAuthenticated()) {
        this.$msal.signIn();
      }
    }
  },
  mixins: [msalMixin]
};
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>

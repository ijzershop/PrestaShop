<!--*
 * For the full copyright and license information, please view the
 * docs/licenses/LICENSE.txt file that was distributed with this source code.
 *-->
<template>
  <div class="card">
    <h3 class="card-header">
      {{ title }}
    </h3>
    <div class="card-body">
      <div class="table js-permissions-table">
        <bulk
          v-if="profileDataPermissions && Object.keys(profileDataPermissions).length > 0 && types && Object.keys(types).length > 0"
          :types="types"
          :profile-permissions="profileDataPermissions"
          @updateBulk="updateBulk"
        />
        <div
          class="col-xs-12"
          v-if="!permissionsData || Object.keys(permissionsData).length === 0"
        >
          <td colspan="6">
            {{ emptyData }}
          </td>
        </div>

        <template
          v-for="(permission, permissionId) in permissionsData"
          :key="permissionId"
        >
          <row
            :can-edit="canEdit"
            :level-depth="1"
            :max-level-depth="4"
            :permission="permission"
            :permission-id="permissionId.toString()"
            :permission-key="permissionKey"
            :profile-permissions="profileDataPermissions"
            :employee-permissions="employeePermissions"
            :parent="permission.children !== undefined"
            :types="Object.keys(types)"
            @sendRequest="sendRequest"
          />
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import {defineComponent} from 'vue';
  import Bulk from './components/bulk.vue';
  import Row from './components/row.vue';

  const {$} = window;

  export default defineComponent({
    name: 'Permission',
    components: {
      Bulk,
      Row,
    },
    props: {
      title: {
        type: String,
        required: false,
        default: '',
      },
      emptyData: {
        type: String,
        required: false,
        default: '',
      },
      profileId: {
        type: Number,
        required: false,
        default: 0,
      },
      messages: {
        type: Object,
        required: false,
        default: () => ({}),
      },
      updateUrl: {
        type: String,
        required: false,
        default: '',
      },
      permissionKey: {
        type: String,
        required: false,
        default: '',
      },
      types: {
        type: Object,
        required: false,
        default: () => ({}),
      },
      permissions: {
        type: Object,
        required: false,
        default: () => ({}),
      },
      profilePermissions: {
        type: Object,
        required: false,
        default: () => ({}),
      },
      employeePermissions: {
        type: [Object, Array],
        required: false,
        default: () => ({}),
      },
      canEdit: {
        type: Boolean,
        required: false,
        default: false,
      },
    },
    data() {
      return {
        profileDataPermissions: {},
        permissionsData: {},
      };
    },
    watch: {
      permissions: {
        handler(val) {
          this.permissionsData = val || {};
        },
        deep: true,
        immediate: true,
      },
      profilePermissions: {
        handler(val) {
          this.profileDataPermissions = val || {};
        },
        deep: true,
        immediate: true,
      },
    },
    mounted() {
      // In case props are already available but data() picking them up correctly
      if (this.permissions && Object.keys(this.permissions).length > 0) {
        this.permissionsData = this.permissions;
      }
      if (this.profilePermissions && Object.keys(this.profilePermissions).length > 0) {
        this.profileDataPermissions = this.profilePermissions;
      }
    },
    methods: {
      /**
       * Send ajax request to target url
       */
      sendRequest(data: Record<string, any>): void {
        data.profile_id = this.profileId;

        $.ajax(
          this.updateUrl,
          {
            method: 'POST',
            data,
          },
        ).then((response) => {
          if (response.success) {
            window.showSuccessMessage(this.messages.success);
            return;
          }

          window.showErrorMessage(this.messages.error);
        }).catch(() => {
          window.showErrorMessage(this.messages.error);
        });
      },
      /**
       * Update user permissions from bulk action
       */
      updateBulk(data: Record<string, any>): void {
        if (!this.profileDataPermissions) {
          return;
        }

        Object.keys(this.profileDataPermissions).forEach((key: string) => {
          data.types.forEach((type: string) => {
            this.profileDataPermissions[key][type] = data.status ? '1' : '0';
          });
        });

        const params: Record<string, any> = {
          is_active: data.status,
          permission: data.updateType,
        };

        params[this.permissionKey] = '-1';

        this.sendRequest(params);
      },
    },
  });
</script>

<style lang="scss" type="text/scss">
@import "~@scss/config/_settings.scss";

.js-permissions-table {
  .permission-row {
    padding: var(--#{$cdk}size-4) 0;
    border-bottom: 1px solid var(--#{$cdk}primary-500);
  }

  .bulk-row {
    padding-bottom: var(--#{$cdk}size-10);
    border-bottom: var(--#{$cdk}size-2) solid var(--#{$cdk}primary-800);
    strong {
      display: block;
      font-size: var(--#{$cdk}size-12);
      font-weight: 600;
      font-family: var(--#{$cdk}font-family-primary);
      white-space: nowrap;
      padding-bottom: var(--#{$cdk}size-5);
    }
  }
}
</style>

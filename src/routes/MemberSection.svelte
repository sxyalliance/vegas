<script lang="ts">
  // member data export by dSaver
  import discordMembers from "$lib/api/discord_members.json"
  import {_} from "svelte-i18n";

  function getMembers() {
    // preprocess roles
    // e.g. 學霸; 紳士; 正式成員; 學-勿李
    // split by ;
    discordMembers.forEach((member: any) => {
      if (typeof member.roles === 'string') {
        member.roles = member.roles.split('; ')
      }
    })

    const roles: Record<string, string> = {
      '認證成員': 'Verified Member',
      '正式成員': 'Official Member',
    }

    // filter members with avatar and role
    const members = discordMembers.filter((member: any) => {
      // no temporary members
      if (member.avatar === null) {
        return false
      }

      // no shadow members
      if (member.roles.includes('影分身')) {
        return false
      }

      // only verified and official members
      for (const role in roles) {
        if (member.roles.includes(role)) {
          return true
        }
      }
    })
    // map members to people
    const people = members.map((member: any) => {
      // replace unrecognized avatar
      if (!member.avatar.startsWith('https://cdn.discordapp.com/avatars/')) {
        // https://cdn.discordapp.com/embed/avatars/{0..4}.png
        member.avatar = 'https://cdn.discordapp.com/embed/avatars/' + Math.floor(Math.random() * 5) + '.png'
      }

      return {
        name: member.nickname || member.username,
        role: roles[member.roles.find((role: string) => roles[role])],
        imageUrl: member.avatar,
        extra: {
          roleCount: member.roles.length,
        }
      }
    })
    // sort by name
    people.sort((a: any, b: any) => a.name.localeCompare(b.name))
    // sort with role and role count
    people.sort((a: any, b: any) => {
      if (a.role === b.role) {
        return b.extra.roleCount - a.extra.roleCount
      }
      return a.role.localeCompare(b.role)
    })
    return people
  }

  const people = getMembers()
</script>

<section class="bg-hue1">
    <div class="max-w-7xl mx-auto py-12 px-4 text-center sm:px-6 lg:px-8 lg:py-24">
        <div class="space-y-8 sm:space-y-12">
            <div class="space-y-5 sm:mx-auto sm:max-w-xl sm:space-y-4 lg:max-w-5xl">
                <h2 class="text-3xl font-extrabold tracking-tight sm:text-4xl text-hue12">
                    {$_('home.member.title')}
                </h2>
                <p class="text-xl text-hue11">
                    {$_('home.member.text')}
                </p>
            </div>
            <ul
                    role="list"
                    class="mx-auto grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4 md:gap-x-6 lg:max-w-5xl lg:gap-x-8 lg:gap-y-12 xl:grid-cols-6"
            >
                {#each people as person (person.name)}
                    <li>
                        <div class="space-y-4">
                            <img src={person.imageUrl} alt={'Avatar of ' + person.name} width={128} height={128}
                                 class="mx-auto h-20 w-20 rounded-full lg:w-24 lg:h-24"/>
                            <div class="space-y-2">
                                <div class="text-xs font-medium lg:text-sm text-hue12">
                                    <h3>{person.name}</h3>
                                    <p class="text-primary10">{person.role}</p>
                                </div>
                            </div>
                        </div>
                    </li>
                {/each}
            </ul>

            <div class="text-xs text-hue10">
                <p>{$_('home.member.note')}</p>
            </div>
        </div>
    </div>
</section>

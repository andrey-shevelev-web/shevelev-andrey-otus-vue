import { describe, it, expect } from "vitest";
import { mount, flushPromises } from "@vue/test-utils";
import component from "@/components/SigninForm.vue"

describe('SigninForm', () => {
  it('mounts without error', () => {
    const wrapper = mount(component)
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()
  })
  it('shows error when login is not valid', async () => {
    vi.useFakeTimers()
    const wrapper = mount(component)
    const form = wrapper.find('form')
    const login = wrapper.find('#email1')
    const password = wrapper.find('#password1')
    const button = wrapper.find('[type="submit"]')
    await login.setValue('none@novhere.com')
    await login.trigger('change')
    await form.trigger('commit')

    vi.runAllTimers()
    expect(wrapper.html()).toMatchSnapshot()
    vi.useRealTimers()
  })

})
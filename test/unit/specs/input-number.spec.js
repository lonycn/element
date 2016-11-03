import { createVue, triggerEvent, destroyVM } from '../util';

describe('InputNumber', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });
  it('create', () => {
    vm = createVue({
      template: `
        <el-input-number v-model="value">
        </el-input-number>
      `,
      data() {
        return {
          value: 1
        };
      }
    }, true);
    let input = vm.$el.querySelector('input');

    expect(vm.value).to.be.equal(1);
    expect(input.value).to.be.equal('1');
  });
  it('decrease', done => {
    vm = createVue({
      template: `
        <el-input-number v-model="value" ref="input">
        </el-input-number>
      `,
      data() {
        return {
          value: 5
        };
      }
    }, true);

    let input = vm.$el.querySelector('input');
    let btnDecrease = vm.$el.querySelector('.el-input-number__decrease');

    triggerEvent(btnDecrease, 'mouseenter');
    triggerEvent(btnDecrease, 'mousedown');
    triggerEvent(document, 'mouseup');

    setTimeout(_ => {
      expect(vm.$el.querySelector('.el-input.is-active')).to.exist;
      expect(vm.value).to.be.equal(4);
      expect(input.value).to.be.equal('4');

      triggerEvent(btnDecrease, 'mouseleave');

      vm.$nextTick(_ => {
        expect(vm.$el.querySelector('.el-input.is-active')).to.not.exist;
        done();
      });
    }, 300);
  });
  it('increase', done => {
    vm = createVue({
      template: `
        <el-input-number v-model="value">
        </el-input-number>
      `,
      data() {
        return {
          value: 1.5
        };
      }
    }, true);

    let input = vm.$el.querySelector('input');
    let btnIncrease = vm.$el.querySelector('.el-input-number__increase');

    triggerEvent(btnIncrease, 'mousedown');
    triggerEvent(document, 'mouseup');

    setTimeout(_ => {
      expect(vm.value).to.be.equal(2.5);
      expect(input.value).to.be.equal('2.5');
      done();
    }, 100);
  });
  it('disabled', done => {
    vm = createVue({
      template: `
        <el-input-number v-model="value" disabled>
        </el-input-number>
      `,
      data() {
        return {
          value: 2
        };
      }
    }, true);

    let input = vm.$el.querySelector('input');
    let btnDecrease = vm.$el.querySelector('.el-input-number__decrease');
    let btnIncrease = vm.$el.querySelector('.el-input-number__increase');

    triggerEvent(btnDecrease, 'mousedown');
    triggerEvent(document, 'mouseup');

    triggerEvent(btnIncrease, 'mousedown');
    triggerEvent(document, 'mouseup');

    setTimeout(_ => {
      expect(vm.value).to.be.equal(2);
      expect(input.value).to.be.equal('2');

      setTimeout(_ => {
        expect(vm.value).to.be.equal(2);
        expect(input.value).to.be.equal('2');
        done();
      }, 100);
    }, 100);
  });
  it('step', done => {
    vm = createVue({
      template: `
        <el-input-number v-model="value" :step="3.2">
        </el-input-number>
      `,
      data() {
        return {
          value: 5
        };
      }
    }, true);

    let input = vm.$el.querySelector('input');
    let btnIncrease = vm.$el.querySelector('.el-input-number__increase');
    let btnDecrease = vm.$el.querySelector('.el-input-number__decrease');

    triggerEvent(btnIncrease, 'mousedown');
    triggerEvent(document, 'mouseup');

    setTimeout(_ => {
      expect(vm.value).to.be.equal(8.2);
      expect(input.value).to.be.equal('8.2');

      triggerEvent(btnDecrease, 'mousedown');
      triggerEvent(document, 'mouseup');

      setTimeout(_ => {
        expect(vm.value).to.be.equal(5);
        expect(input.value).to.be.equal('5');
        done();
      }, 100);
    }, 100);
  });
  it('min', done => {
    vm = createVue({
      template: `
        <el-input-number v-model="value" :min="6">
        </el-input-number>
      `,
      data() {
        return {
          value: 6
        };
      }
    }, true);
    const vm2 = createVue({
      template: `
        <el-input-number v-model="value" :min="6">
        </el-input-number>
      `,
      data() {
        return {
          value: 3
        };
      }
    }, true);

    expect(vm2.value === 6);
    expect(vm2.$el.querySelector('input').value).to.be.equal('6');

    let input = vm.$el.querySelector('input');
    let btnDecrease = vm.$el.querySelector('.el-input-number__decrease');

    triggerEvent(btnDecrease, 'mousedown');
    triggerEvent(document, 'mouseup');

    setTimeout(_ => {
      expect(vm.value).to.be.equal(6);
      expect(input.value).to.be.equal('6');
      done();
    }, 100);
  });
  it('max', done => {
    vm = createVue({
      template: `
        <el-input-number v-model="value" :max="8">
        </el-input-number>
      `,
      data() {
        return {
          value: 8
        };
      }
    }, true);
    const vm2 = createVue({
      template: `
        <el-input-number v-model="value" :max="8">
        </el-input-number>
      `,
      data() {
        return {
          value: 100
        };
      }
    }, true);

    expect(vm2.value === 8);
    expect(vm2.$el.querySelector('input').value).to.be.equal('8');

    let input = vm.$el.querySelector('input');
    let btnIncrease = vm.$el.querySelector('.el-input-number__increase');

    triggerEvent(btnIncrease, 'mousedown');
    triggerEvent(document, 'mouseup');

    setTimeout(_ => {
      expect(vm.value).to.be.equal(8);
      expect(input.value).to.be.equal('8');
      done();
    }, 100);
  });
});

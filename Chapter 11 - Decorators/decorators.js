// Decorators are meta programming constructs
// Allow you to write code that changes the behaviour of other code
// Angular is a good example of a decorator library
// Is an OO feature - so just for classes and things in classes
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
// Decorators in JS are just functions. For ECMA decorators they require 2 arguments
// T extends new() => {} represends "generic extends new class with any arguments"
function logger(target, ctx) {
    console.log('logger decorator');
    console.log(target);
    console.log(ctx);
    // To change a class we return a new class that is based on the old class
    return /** @class */ (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var _this = _super.apply(this, args) || this;
            console.log('class constructor');
            console.log(_this);
            return _this;
        }
        return class_1;
    }(target));
}
; // target is the thing you're tagging, ctx is added information
// Function is a type built into typescript, which is same as (...args: any[]) => any
function autobind(target, ctx) {
    ctx.addInitializer(function () {
        // This is the class to which this method belongs
        this[ctx.name] = this[ctx.name].bind(this);
    }); // This is a utility method 
    return function () {
        console.log('Executing original function');
        target(); // Call original method after, but target is the original method without being tweaked above, so this context will still be undefined
        // Instead do this
        target.apply(this);
    };
}
function replacer(initValue) {
    return function replacerDecorator(target, ctx) {
        console.log(target);
        console.log(ctx);
        // You can access the value in the field in this return statement
        return function (initialValue) {
            console.log(initialValue);
            // return ''; // This overrides field to be empty
            return initValue;
        };
    };
}
var Person = function () {
    var _classDecorators = [logger];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _name_decorators;
    var _name_initializers = [];
    var _name_extraInitializers = [];
    var _greet_decorators;
    var Person = _classThis = /** @class */ (function () {
        function Person_1() {
            this.name = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _name_initializers, 'Steve'));
            __runInitializers(this, _name_extraInitializers);
        }
        Person_1.prototype.greet = function () {
            console.log('Hi, I am ' + this.name);
        };
        return Person_1;
    }());
    __setFunctionName(_classThis, "Person");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _name_decorators = [replacer('MainSteve')];
        _greet_decorators = [autobind];
        __esDecorate(_classThis, null, _greet_decorators, { kind: "method", name: "greet", static: false, private: false, access: { has: function (obj) { return "greet" in obj; }, get: function (obj) { return obj.greet; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: function (obj) { return "name" in obj; }, get: function (obj) { return obj.name; }, set: function (obj, value) { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Person = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Person = _classThis;
}();
;
var steve = new Person();
var anotherName = new Person();
/*
This log is output when the class definition is parsed by js
logger decorator
[Function: Person]
{
  kind: 'class',
  name: 'Person',
  metadata: undefined,
  addInitializer: [Function (anonymous)]
}

This log is output when the class is instantiated
class constructor
class_1 { name: 'Steve' }
class constructor
class_1 { name: 'Steve' }
*/
var hila = new Person();
var greet = hila.greet; // Store pointer to method from hila instance
greet(); // What this will return is "Hi, I am undefined" as we are trying to access this
// When exeuting like hila.greet(), this keyword context is hila. When called as a pointer then this is undefined in js
// You can bind context in classes to solve this, like this:
/*
constructor() {
this.greet = this.greet.gind(this)
}
*/
// Or alternatively with autobind decorator

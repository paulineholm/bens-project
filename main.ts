let lightIntensity = 0
basic.forever(function () {
    lightIntensity = smarthome.ReadLightIntensity(AnalogPin.P3)
    basic.pause(1000)
    if (lightIntensity >= 10) {
        basic.showNumber(input.temperature())
        if (input.temperature() >= 18) {
            OLED.writeStringNewLine("Fugtigt! Du bør lufte ud")
            smarthome.motorFan(AnalogPin.P1, true)
            if (input.buttonIsPressed(Button.A)) {
                smarthome.motorFan(AnalogPin.P1, false)
            }
        } else {
            smarthome.motorFan(AnalogPin.P1, false)
            OLED.writeStringNewLine("Optimalt luftkvalitet!")
            if (input.buttonIsPressed(Button.B)) {
                smarthome.motorFan(AnalogPin.P1, true)
                if (input.buttonIsPressed(Button.A)) {
                    smarthome.motorFan(AnalogPin.P1, false)
                }
            }
        }
    } else {
        if (lightIntensity < 10) {
            if (input.buttonIsPressed(Button.A) && input.temperature() >= 17) {
                OLED.init(128, 64)
                OLED.writeNumNewLine(input.temperature())
                OLED.writeStringNewLine("Fugtigt :(! Du bør lufte ud!")
            }
            if (input.buttonIsPressed(Button.A) && input.temperature() < 17) {
                OLED.init(128, 64)
                OLED.writeNumNewLine(input.temperature())
                OLED.writeStringNewLine("Optimalt luftkvalitet :)")
            }
            if (input.buttonIsPressed(Button.AB)) {
                smarthome.motorFan(AnalogPin.P1, true)
                if (input.buttonIsPressed(Button.AB)) {
                    smarthome.motorFan(AnalogPin.P1, false)
                }
            }
        }
    }
})
